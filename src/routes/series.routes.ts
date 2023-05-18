import express from "express";
import { checkInfo, getAllSeries } from "../controller/series.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllSeries);
router.get("/info", checkInfo);

export default router;
