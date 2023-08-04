import express from "express";
const router = express.Router();
import productController from "../controllers/ProductController";
import middlewareController from "../controllers/middlewareController";
router.post("/create", middlewareController.verifyAdmin, productController.create);
router.post("/delete/:_id", middlewareController.verifyAdmin, productController.delete);
router.post("/update/:_id", middlewareController.verifyAdmin, productController.update);

module.exports = router;
