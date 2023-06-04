import express from "express";
import { checkIdValid } from "../middleware/validation.middleware";
import {
  createSpecie,
  deleteSpecie,
  getAllSpecies,
  getSpecieByID,
  updateSpecie,
} from "../controller/species.controller";
import { checkBodyValid } from "../middleware/specie.middleware";
import { isAuth } from "../middleware/user.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllSpecies);
router.get("/:id", checkIdValid, getSpecieByID);
router.post("/", isAuth, checkBodyValid, createSpecie);
router.put("/:id", isAuth, checkIdValid, updateSpecie);
router.delete("/:id", isAuth, checkIdValid, deleteSpecie);

export default router;
