import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.post("/login", userController.login);
router.post("/register-user", userController.register);

module.exports = router;
