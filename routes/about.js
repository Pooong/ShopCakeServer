import express from "express";
const router = express.Router();
import aboutController from "../controllers/AboutController";

router.get("/show", aboutController.showAbout);

module.exports = router;
