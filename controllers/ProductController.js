import Product from "../src/models/Product";
var ObjectId = require("mongoose").Types.ObjectId;

class ProductController {
	//[POST] api/Product/create
	async create(req, res, next) {
		console.log(req.body);
		try {
			const newProduct = new Product(req.body);
			res.json(req.body);
			newProduct.save();
		} catch (error) {
			console.log(error);
			return res.json("Co loi xay ra");
		}
	}

	//[POST] api/Product/delete/_id
	delete(req, res, next) {
		const idDelete = req.params._id;
		if (idDelete) {
			console.log(idDelete);
			Product.findByIdAndDelete({ _id: idDelete })
				.then(() => res.send("Xóa thành công"))
				.catch(next);
		} else {
			res.send("ID không hợp lệ");
		}
	}

	//[POST] api/Product/update/_id
	update(req, res, next) {
		const idUpdate = req.params._id;
		const { name, image, description, price } = req.body;
		if (idUpdate) {
			Product.findByIdAndUpdate(idUpdate, {
				name,
				description,
				image,
				price,
			})
				.then(() => res.send("update thành công"))
				.catch(next);
		} else {
			res.send("ID không hợp lệ");
		}
	}
}

module.exports = new ProductController();
