import express from "express";
import {
  getAllTechonologies,
} from "../controller/technologies.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllTechonologies);

export default router;
