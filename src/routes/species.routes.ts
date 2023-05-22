import express from "express";
import { checkIdValid } from "../middleware/validation.middleware";
import {
  createSpecie,
  deleteSpecie,
  getAllSpecies,
  getSpecieByID,
  updateSpecie,
} from "../controller/species.controller";
import { checkBodyValid } from "../middleware/character.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllSpecies);
router.get("/:id", checkIdValid, getSpecieByID);
router.post("/", checkBodyValid, createSpecie);
router.put("/:id", checkIdValid, updateSpecie);
router.delete("/:id", checkIdValid, deleteSpecie);

export default router;
