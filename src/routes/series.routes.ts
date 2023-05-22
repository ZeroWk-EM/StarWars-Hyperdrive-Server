import express from "express";
import {  getAllSeries } from "../controller/series.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllSeries);

export default router;
