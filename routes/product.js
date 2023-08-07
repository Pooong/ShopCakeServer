import express from "express";
const router = express.Router();

import uploadCloudinary from "../config/cloudinary";

import productController from "../controllers/ProductController";
import middlewareController from "../controllers/middlewareController";

//, middlewareController.verifyAdmin,
router.post("/create", uploadCloudinary.array("image", 4), productController.create);
router.post("/delete/:_id", middlewareController.verifyAdmin, productController.delete);
router.post("/update/:_id", middlewareController.verifyAdmin, productController.update);

module.exports = router;
