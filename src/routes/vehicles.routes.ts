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

const router = express.Router();
router.use(express.json());

router.get("/", getAllVehicles);
router.get("/:id", checkIdValid, getVehicleByID);
router.post("/", checkBodyValid, createVehicle);
router.put("/:id", checkIdValid, updateVehicle);
router.delete("/:id", checkIdValid, deleteVehicle);

export default router;
