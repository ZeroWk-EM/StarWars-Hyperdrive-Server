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
import { isAuth } from "../middleware/user.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllEndpoints);
router.get("/:id", isAuth, checkIdValid, getEndpointByID);
router.post("/", isAuth, checkBodyValid, createEndpoint);
router.put("/:id", isAuth, checkIdValid, updateEndpoint);
router.delete("/:id", isAuth, checkIdValid, deleteEndpoint);

export default router;
