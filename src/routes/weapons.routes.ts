import express from "express";
import {  getAllWeapons } from "../controller/weapons.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllWeapons);

export default router;
