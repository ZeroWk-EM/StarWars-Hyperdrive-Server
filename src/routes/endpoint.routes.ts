import express from "express";
import {
  createEndpoint,
  deleteEndpoint,
  getAllEndpoints,
  getEndpointByID,
  updateEndpoint,
} from "../controller/endpoint.controller";
import { checkIdValid } from "../middleware/validation.middleware";
import { checkBodyValid } from "../middleware/endpoint.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllEndpoints);
router.get("/:id", checkIdValid, getEndpointByID);
router.post("/", checkBodyValid, createEndpoint);
router.put("/:id", checkIdValid, updateEndpoint);
router.delete("/:id", checkIdValid, deleteEndpoint);

export default router;
