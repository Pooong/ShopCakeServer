import express from "express";
const router = express.Router();
import userController from "../controllers/UserController";
import middlewareController from "../controllers/middlewareController";

router.get("/", middlewareController.verifyToken, userController.getAllUsers);
router.delete("/deleted/:_id", middlewareController.verifyTokenAndAdminAuh, userController.deletedUser);

module.exports = router;
