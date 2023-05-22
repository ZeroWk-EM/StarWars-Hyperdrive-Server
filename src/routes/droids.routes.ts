import express from "express";
import {  getAllDroids } from "../controller/droids.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllDroids);

export default router;
