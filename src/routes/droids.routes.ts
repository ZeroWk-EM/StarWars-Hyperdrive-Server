import express from "express";
import { checkInfo, getAllDroids } from "../controller/droids.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllDroids);
router.get("/info", checkInfo);

export default router;
