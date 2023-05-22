import express from "express";
import {  getAllVehicles } from "../controller/vehicles.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllVehicles);

export default router;
