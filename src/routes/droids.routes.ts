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

const router = express.Router();
router.use(express.json());

router.get("/", getAllDroids);
router.get("/:id", checkIdValid, getDroidByID);
router.post("/", checkBodyValid, createDroid);
router.put("/:id", checkIdValid, updateDroid);
router.delete("/:id", checkIdValid, deleteDroid);

export default router;
