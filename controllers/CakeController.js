import Cake from "../src/models/Cake";
var ObjectId = require("mongoose").Types.ObjectId;

class CakeController {
	//[POST] api/cake/create
	async create(req, res, next) {
		try {
			const { name, description, image, videoId, level } = { ...req.body };
			const newCake = new Cake({
				name: name,
				description: description,
				image: image,
				videoId: videoId,
			});
			res.send("Da tao thanh cong");
			newCake.save();
		} catch (error) {
			console.log(error);
			return res.status(401).json(error);
		}
	}

	//[POST] api/cake/delete/_id
	delete(req, res, next) {
		const idDelete = req.params._id;
		if (idDelete) {
			console.log(idDelete);
			Cake.findByIdAndDelete({ _id: idDelete })
				.then(() => res.send("Xóa thành công"))
				.catch(next);
		} else {
			res.send("ID không hợp lệ");
		}
	}

	//[POST] api/cake/update/_id
	update(req, res, next) {
		const idUpdate = req.params._id;
		const { name, image, description, videoId } = req.body;
		if (idUpdate) {
			Cake.findByIdAndUpdate(idUpdate, {
				name,
				description,
				image,
				videoId,
			})
				.then(() => res.send("update thành công"))
				.catch(next);
		} else {
			res.send("ID không hợp lệ");
		}
	}

	//[GET] api/cake/show/
	async showListCake(req, res, next) {
		const dataCake = await Cake.find().lean();
		if (dataCake) {
			res.send(dataCake);
		} else {
			res.send("Empty List");
		}
	}

	//[GET] api/cake/show/:_id
	async showById(req, res, next) {
		const idFind = req.params._id;
		if (idFind) {
			const dataCakebyId = await Cake.findById(idFind).lean();
			res.send(dataCakebyId);
		} else {
			res.send("Không tìm thấy Id");
		}
	}
}

module.exports = new CakeController();
