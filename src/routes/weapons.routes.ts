import express from "express";
import { checkIdValid } from "../middleware/validation.middleware";
import {
  createWeapon,
  deleteWeapon,
  getAllWeapons,
  getWeaponByID,
  updateWeapon,
} from "../controller/weapons.controller";
import { checkBodyValid } from "../middleware/weapons.middleware";
import { isAuth } from "../middleware/user.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllWeapons);
router.get("/:id", checkIdValid, getWeaponByID);
router.post("/", isAuth, checkBodyValid, createWeapon);
router.put("/:id", isAuth, checkIdValid, updateWeapon);
router.delete("/:id", isAuth, checkIdValid, deleteWeapon);

export default router;
