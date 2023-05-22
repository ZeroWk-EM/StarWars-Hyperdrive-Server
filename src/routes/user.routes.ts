import express from "express";
import { getAllUsers } from "../controller/user.controller";

const router = express.Router();
router.use(express.json());

router.get("/list", getAllUsers);

export default router;
