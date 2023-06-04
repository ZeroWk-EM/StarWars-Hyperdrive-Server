import express from "express";
import { checkIdValid } from "../middleware/validation.middleware";
import {
  createDroid,
  deleteDroid,
  getAllDroids,
  getDroidByID,
  updateDroid,
} from "../controller/droids.controller";
import { checkBodyValid } from "../middleware/droid.middleware";
import { isAuth } from "../middleware/user.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllDroids);
router.get("/:id", checkIdValid, getDroidByID);
router.post("/", isAuth, checkBodyValid, createDroid);
router.put("/:id", isAuth, checkIdValid, updateDroid);
router.delete("/:id", isAuth, checkIdValid, deleteDroid);

export default router;
