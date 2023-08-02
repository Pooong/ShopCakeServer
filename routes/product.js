import express from "express";
const router = express.Router();
import productController from "../controllers/ProductController";

router.post("/create", productController.create);
router.post("/delete/:_id", productController.delete);
router.post("/update/:_id", productController.update);

module.exports = router;
