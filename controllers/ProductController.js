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

	//[GET] api/Product/show/
	async showListProduct(req, res, next) {
		const dataProduct = await Product.find().lean();
		if (dataProduct) {
			res.send(dataProduct);
		} else {
			res.send("Empty List");
		}
	}

	//[GET] api/Product/show/:_id
	async showById(req, res, next) {
		const idFind = req.params._id;
		if (idFind) {
			const dataProductbyId = await Product.findById(idFind).lean();
			res.send(dataProductbyId);
		} else {
			res.send("Không tìm thấy Id");
		}
	}

	async showProductBySearch(req, res, next) {
		const { ProductName } = req.query;
		if (ProductName) {
			// console.log({ ProductName });
			try {
				const regex = new RegExp(ProductName, "i");
				const dataProduct = await Product.find({ name: regex });
				res.status(200).send(dataProduct);
			} catch (error) {
				res.status(400).send("loi");
				console.log(error);
			}

			// const findSearchProduct = dataProduct.filter((item) => item.name.includes(ProductName));
		} else {
			res.send("Loi roi");
		}
	}
}

module.exports = new ProductController();