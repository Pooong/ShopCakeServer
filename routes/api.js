import express from "express";
const router = express.Router();
import apiController from "../controllers/apiController";

router.get("/product", apiController.showListProduct);
//api/show/showbysearch
router.get("/product/showbysearch", apiController.showProductBySearch);
//Api/product/:id
router.get("/product/:_id", apiController.showById);

export default router;
