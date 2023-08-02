import express from "express";
const router = express.Router();

import productRouter from "./product";
import aboutRouter from "./about";
import homeRouter from "./home";
import productController from "../controllers/ProductController";

/* GET home page. */
function route(app) {
	//Api
	//Api/product
	router.get("/show", productController.showListProduct);
	//api/show/showbysearch
	router.get("/show/showbysearch", productController.showProductBySearch);
	//Api/product/:id
	router.get("/show/:_id", productController.showById);

	//Api/type
	//Api/cart
	//Api/cart/id
	app.use("/product", productRouter);
	app.use("/about", aboutRouter);
	app.use("/home", homeRouter);

	app.use("/", function (req, res, next) {
		res.render("index", { title: "Express" });
	});
}

module.exports = route;
