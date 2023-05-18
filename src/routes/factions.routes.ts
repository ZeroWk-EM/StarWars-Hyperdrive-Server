import express from "express";
import { checkInfo, getAllFactions } from "../controller/factions.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllFactions);
router.get("/info", checkInfo);

export default router;
