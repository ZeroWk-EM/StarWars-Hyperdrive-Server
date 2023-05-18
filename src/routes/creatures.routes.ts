import express from "express";
import { checkInfo, getAllCreatures } from "../controller/creatures.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllCreatures);
router.get("/info", checkInfo);

export default router;
