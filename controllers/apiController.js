import Product from "../src/models/Product";

const apiController = {
	//[GET] api/Product/show/
	showListProduct: async function (req, res, next) {
		const dataProduct = await Product.find().lean();
		if (dataProduct) {
			res.json(dataProduct);
		} else {
			res.send("Empty List");
		}
	},

	//[GET] api/Product/show/:_id
	showById: async function (req, res, next) {
		const idFind = req.params._id;
		if (idFind) {
			const dataProductbyId = await Product.findById(idFind).lean();
			res.send(dataProductbyId);
		} else {
			res.send("Không tìm thấy Id");
		}
	},

	showProductBySearch: async function (req, res, next) {
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
	},
};
export default apiController;
