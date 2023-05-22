import express from "express";
import { checkIdValid } from "../middleware/validation.middleware";
import {
  createSerie,
  deleteSerie,
  getAllSeries,
  getSerieByID,
  updateSerie,
} from "../controller/series.controller";
import { checkBodyValid } from "../middleware/character.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllSeries);
router.get("/:id", checkIdValid, getSerieByID);
router.post("/", checkBodyValid, createSerie);
router.put("/:id", checkIdValid, updateSerie);
router.delete("/:id", checkIdValid, deleteSerie);

export default router;
