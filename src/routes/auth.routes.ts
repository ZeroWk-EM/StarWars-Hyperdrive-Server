import express from "express";
import { loginUser, registerUser } from "../controller/auth.controller";
import { emailUnique } from "../middleware/user.middleware";

const router = express.Router();
router.use(express.json());

router.post("/register", emailUnique, registerUser);

router.post("/login", loginUser);

export default router;
