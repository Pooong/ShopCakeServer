import Product from "../src/models/Product";
var ObjectId = require("mongoose").Types.ObjectId;

class ProductController {
	//[POST] api/Product/create
	// async create(req, res, next) {
	// 	try {
	// 		// const fileImage = req.files;
	// 		const newProduct = await new Product(req.body);
	// 		newProduct.save();
	// 		console.log(newProduct);
	// 		res.status(200).json("Tạo thành công");
	// 	} catch (error) {
	// 		console.log(error);
	// 		return res.json("Co loi xay ra");
	// 	}
	// }

	async create(req, res, next) {
		try {
			const fileImage = req.file;
			const { name, description, image, price } = req.body;
			if ({ name, description, image, price }) {
				const newProduct = await Product.create({
					name: name,
					description: description,
					image: image,
					price: price,
				});
				console.log(fileImage);
				console.log(newProduct);
				res.status(200).json("OK");
			} else {
				res.status(400).json("thiếu dữ liệu");
			}
		} catch (error) {
			console.log(error);
			return res.status(401).json("loi roi");
		}
	}

	//[POST] api/Product/delete/_id
	delete(req, res, next) {
		const idDelete = req.params._id;
		if (idDelete) {
			Product.findByIdAndDelete({ _id: idDelete })
				.then(() => res.status(200).json("Update thành công"))
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
				type,
			})
				.then(() => res.status(200).json("Update thành công"))
				.catch(next);
		} else {
			res.send("ID không hợp lệ");
		}
	}
}

module.exports = new ProductController();
