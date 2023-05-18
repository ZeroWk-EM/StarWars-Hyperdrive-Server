import express from "express";
import {
  checkInfo,
  getAllTechonologies,
} from "../controller/technologies.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllTechonologies);
router.get("/info", checkInfo);

export default router;
