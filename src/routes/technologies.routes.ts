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
import { isAuth } from "../middleware/user.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllTechonologies);
router.get("/:id", checkIdValid, getTechnologieByID);
router.post("/", isAuth, checkBodyValid, createTechnologie);
router.put("/:id", isAuth, checkIdValid, updateTechnologie);
router.delete("/:id", isAuth, checkIdValid, deleteTechnologie);

export default router;
