import express from "express";
import { checkIdValid } from "../middleware/validation.middleware";
import {
  createTechnologie,
  deleteTechnologie,
  getAllTechonologies,
  getTechnologieByID,
  updateTechnologie,
} from "../controller/technologies.controller";
import { checkBodyValid } from "../middleware/technologies.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllTechonologies);
router.get("/:id", checkIdValid, getTechnologieByID);
router.post("/", checkBodyValid, createTechnologie);
router.put("/:id", checkIdValid, updateTechnologie);
router.delete("/:id", checkIdValid, deleteTechnologie);

export default router;
