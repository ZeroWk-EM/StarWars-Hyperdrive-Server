import express from "express";
import {  getAllFactions } from "../controller/factions.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllFactions);

export default router;
