import express from "express";
import { checkIdValid } from "../middleware/validation.middleware";
import {
  createSerie,
  deleteSerie,
  getAllSeries,
  getSerieByID,
  updateSerie,
} from "../controller/series.controller";
import { checkBodyValid } from "../middleware/serie.middleware";
import { isAuth } from "../middleware/user.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllSeries);
router.get("/:id", checkIdValid, getSerieByID);
router.post("/", isAuth, checkBodyValid, createSerie);
router.put("/:id", isAuth, checkIdValid, updateSerie);
router.delete("/:id", isAuth, checkIdValid, deleteSerie);

export default router;
