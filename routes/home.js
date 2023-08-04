import express from "express";
const router = express.Router();
import homeController from "../controllers/SiteController";

router.get("/show", homeController.showHome);

module.exports = router;
