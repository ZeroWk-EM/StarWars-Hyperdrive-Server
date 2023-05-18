import express from "express";
import {
  checkInfo,
  getAllCharacters,
} from "../controller/characters.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllCharacters);
router.get("/info", checkInfo);

export default router;
