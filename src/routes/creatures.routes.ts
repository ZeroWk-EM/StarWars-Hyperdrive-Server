import express from "express";
import { checkIdValid } from "../middleware/validation.middleware";
import {
  createCreature,
  deleteCreature,
  getAllCreatures,
  getCreatureByID,
  updateCreature,
} from "../controller/creatures.controller";
import { checkBodyValid } from "../middleware/character.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllCreatures);
router.get("/:id", checkIdValid, getCreatureByID);
router.post("/", checkBodyValid, createCreature);
router.put("/:id", checkIdValid, updateCreature);
router.delete("/:id", checkIdValid, deleteCreature);

export default router;
