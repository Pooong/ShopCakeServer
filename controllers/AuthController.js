import userModel from "../src/models/UserModel";
import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;
import jwt from "jsonwebtoken";
const promisify = require("util").promisify;
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

let arrRefreshTokens = [];
const authController = {
	//GENERATE ACCESS TOKEN
	generateAccessToken: (user) => {
		return jwt.sign(
			{
				id: user.id,
				admin: user.admin,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: process.env.ACCESS_TOKEN_LIFE },
		);
	},
	//GENERATE REFRESH TOKEN
	generateRefreshToken: (user) => {
		return jwt.sign(
			{
				id: user.id,
				admin: user.admin,
			},
			process.env.ACCESS_TOKEN_REFRESH,
			{ expiresIn: process.env.ACCESS_TOKEN_REFRESH_LIFE },
		);
	},
	register: async function (req, res, next) {
		try {
			const dataUser = req.body;

			const username = await dataUser.username.toLowerCase();

			const user = await userModel.findOne({ username });

			if (user) res.status(409).send("Tên tài khoản đã tồn tại.");
			else {
				const hashPassword = bcrypt.hashSync(dataUser.password, SALT_ROUNDS);

				const newUser = {
					username,
					password: hashPassword,
					fullname: dataUser.fullname,
					numberphone: dataUser.numberphone,
					address: dataUser.address,
				};
				const createUser = await userModel.create(newUser);
				if (!createUser) {
					return res.status(400).send("Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.");
				}
				return res.send({
					username,
					password: hashPassword,
					fullname: dataUser.fullname,
					numberphone: dataUser.numberphone,
					address: dataUser.address,
				});
			}
		} catch (error) {
			res.status(500).json(error);
		}
	},
	login: async function (req, res, next) {
		try {
			const dataLogin = req.body;
			const user = await userModel.findOne({ username: dataLogin.username });

			if (!user) {
				res.status(404).json("Username không chính xác");
			}

			const isPasswordValid = await bcrypt.compareSync(dataLogin.password, user.password);
			if (!isPasswordValid) {
				return res.status(401).send("Mật khẩu không chính xác.");
			}
			if (user && isPasswordValid) {
				const accessToken = await authController.generateAccessToken(user);
				const refreshToken = await authController.generateRefreshToken(user);
				arrRefreshTokens.push(refreshToken);
				res.cookie("refreshToken", refreshToken, {
					httpOnly: true,
					secure: false,
					path: "/",
					sameSite: "strict",
				});
				const { password, ...others } = user._doc;
				res.status(200).json({ ...others, accessToken, refreshToken });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	},
	requestRefreshToken: async function (req, res, next) {
		//Lay refresh token từ user
		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) {
			return res.status(401).json("You are not authenicated");
		}
		//Kiem tra xem có tìm thấy refreshToken hay không?
		if (!arrRefreshTokens.includes(refreshToken)) {
			res.status(403).json("Refresh Token is not valid");
		}
		const verifyRefreshToken = await jwt.verify(refreshToken, process.env.ACCESS_TOKEN_REFRESH, (err, user) => {
			if (err) {
				console.log(err);
			}
			arrRefreshTokens = arrRefreshTokens.filter((token) => token !== refreshToken);
			const newAccessToken = authController.generateAccessToken(user);
			const newRefreshToken = authController.generateRefreshToken(user);
			arrRefreshTokens.push(newRefreshToken);
			res.cookie("refreshToken", newRefreshToken, {
				httpOnly: true,
				secure: false,
				path: "/",
				sameSite: "strict",
			});
			res.status(200).json({ accessToken: newAccessToken });
		});
	},
	//LOGOUT
	userlogout: async function (req, res, next) {
		res.clearCookie("refreshToken");
		arrRefreshTokens = arrRefreshTokens.filter((token) => token !== req.cookies.refreshToken);
		res.status(200).json("Logout Successfully");
	},
};

export default authController;
