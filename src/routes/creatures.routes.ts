import express from "express";
import { checkIdValid } from "../middleware/validation.middleware";
import {
  createCreature,
  deleteCreature,
  getAllCreatures,
  getCreatureByID,
  updateCreature,
} from "../controller/creatures.controller";
import { checkBodyValid } from "../middleware/creature.middleware";
import { isAuth } from "../middleware/user.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllCreatures);
router.get("/:id", checkIdValid, getCreatureByID);
router.post("/", isAuth, checkBodyValid, createCreature);
router.put("/:id", isAuth, checkIdValid, updateCreature);
router.delete("/:id", isAuth, checkIdValid, deleteCreature);

export default router;
