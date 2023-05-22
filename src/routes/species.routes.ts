import express from "express";
import {  getAllSpecies } from "../controller/species.controller";

const router = express.Router();
router.use(express.json());

router.get("/",getAllSpecies)

export default router;
