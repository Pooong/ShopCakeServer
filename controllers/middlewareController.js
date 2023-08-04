import jwt from "jsonwebtoken";

const middlewareController = {
	//verifyToken
	verifyToken: async function (req, res, next) {
		const token = req.headers.token;
		if (token) {
			//Bearer ...Token
			const accessToken = await token.split(" ")[1];
			const jwtVerify = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
				if (err) {
					res.status(403).json("Token is not valid!!");
				}
				req.user = user;
				next();
			});
		} else {
			res.status(401).json("You are not Authenicated");
		}
	},
	verifyTokenAndAdminAuh: async function (req, res, next) {
		const awaitMiddleware = await middlewareController.verifyToken(req, res, () => {
			if (req.user.id === req.params._id || req.user.admin) {
				next();
			} else {
				res.status(403).json("Bad behaviour");
			}
		});
	},
	verifyAdmin: async function (req, res, next) {
		const awaitMiddleware = await middlewareController.verifyToken(req, res, () => {
			if (req.user.admin) {
				next();
			} else {
				res.status(403).json("Bad behaviour");
			}
		});
	},
};

export default middlewareController;
