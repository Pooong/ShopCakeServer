import express from "express";
const router = express.Router();
import authController from "../controllers/AuthController";
import middlewareController from "../controllers/middlewareController";

//register
router.post("/register", authController.register);

//login
router.post("/login", authController.login);

//REFRESH
router.post("/refresh", authController.requestRefreshToken);

//logout
router.post("/logout", middlewareController.verifyToken, authController.userlogout);

module.exports = router;
