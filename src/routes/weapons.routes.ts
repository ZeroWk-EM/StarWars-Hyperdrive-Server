import express from "express";
import { checkIdValid } from "../middleware/validation.middleware";
import {
  createWeapon,
  deleteWeapon,
  getAllWeapons,
  getWeaponByID,
  updateWeapon,
} from "../controller/weapons.controller";
import { checkBodyValid } from "../middleware/character.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllWeapons);
router.get("/:id", checkIdValid, getWeaponByID);
router.post("/", checkBodyValid, createWeapon);
router.put("/:id", checkIdValid, updateWeapon);
router.delete("/:id", checkIdValid, deleteWeapon);

export default router;
