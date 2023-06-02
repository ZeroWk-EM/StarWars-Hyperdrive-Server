import express from "express";
import { checkIdValid } from "../middleware/validation.middleware";
import {
  createFaction,
  deleteFaction,
  getAllFactions,
  getFactionByID,
  updateFaction,
} from "../controller/factions.controller";
import { checkBodyValid } from "../middleware/faction.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllFactions);
router.get("/:id", checkIdValid, getFactionByID);
router.post("/", checkBodyValid, createFaction);
router.put("/:id", checkIdValid, updateFaction);
router.delete("/:id", checkIdValid, deleteFaction);

export default router;
