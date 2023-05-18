import express from "express";
import { checkInfo, getAllWeapons } from "../controller/weapons.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllWeapons);
router.get("/info", checkInfo);

export default router;
