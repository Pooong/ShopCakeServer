import express from "express";
const router = express.Router();
import cakeController from "../controllers/CakeController";

router.post("/create", cakeController.create);
router.post("/delete/:_id", cakeController.delete);
router.post("/update/:_id", cakeController.update);
router.get("/show", cakeController.showListCake);
router.get("/show/:_id", cakeController.showById);

module.exports = router;
