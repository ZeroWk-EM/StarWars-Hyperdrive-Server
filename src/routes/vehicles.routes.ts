import express from "express";
import { checkInfo, getAllVehicles } from "../controller/vehicles.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllVehicles);
router.get("/info", checkInfo);

export default router;
