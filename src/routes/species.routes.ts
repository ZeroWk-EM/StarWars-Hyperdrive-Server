import express from "express";
import { checkInfo, getAllSpecies } from "../controller/species.controller";

const router = express.Router();
router.use(express.json());

router.get("/",getAllSpecies)
router.get("/info", checkInfo);

export default router;
