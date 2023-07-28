import express from "express";
const router = express.Router();
import homeController from "../controllers/HomeController";

router.get("/show", homeController.showHome);

module.exports = router;
