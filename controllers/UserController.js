import userModel from "../src/models/UserModel";

const userController = {
	//[GET] Get all Users
	getAllUsers: async function (req, res, next) {
		try {
			const dataUsers = await userModel.find({});
			res.status(200).json(dataUsers);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	//[DELETE] Delete User
	deletedUser: async function (req, res, next) {
		try {
			const idDelete = req.params._id;
			// console.log(idDelete);
			const userDelete = await userModel.findByIdAndDelete(idDelete);
			res.status(200).json("Đã xóa thành công");
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

export default userController;
