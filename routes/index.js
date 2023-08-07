import express from "express";
const router = express.Router();

import productRouter from "./product";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import apiRouter from "./api";
/* GET home page. */
function route(app) {
	//Api
	//Api/product

	//Api/type
	//Api/cart
	//Api/cart/id
	app.use("/api", apiRouter);
	app.use("/product", productRouter);
	//post image

	//Account
	app.use("/auth", authRouter);
	app.use("/users", userRouter);
	//Upload Image
	app.use("/", function (req, res, next) {
		res.render("index", { title: "Express" });
	});
}

module.exports = route;
