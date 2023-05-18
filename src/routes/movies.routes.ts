import express from "express";
import { checkInfo, getAllMovies } from "../controller/movies.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllMovies);
router.get("/info", checkInfo);

export default router;
