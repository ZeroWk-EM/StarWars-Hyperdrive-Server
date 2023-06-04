import express from "express";
import { checkIdValid } from "../middleware/validation.middleware";
import {
  createVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicleByID,
  updateVehicle,
} from "../controller/vehicles.controller";
import { checkBodyValid } from "../middleware/vehicle.middleware";
import { isAuth } from "../middleware/user.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllVehicles);
router.get("/:id", checkIdValid, getVehicleByID);
router.post("/", isAuth, checkBodyValid, createVehicle);
router.put("/:id", isAuth, checkIdValid, updateVehicle);
router.delete("/:id", isAuth, checkIdValid, deleteVehicle);

export default router;
