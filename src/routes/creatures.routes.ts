import express from "express";
import {  getAllCreatures } from "../controller/creatures.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllCreatures);

export default router;
