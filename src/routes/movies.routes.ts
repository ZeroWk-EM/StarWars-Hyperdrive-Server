import express from "express";
import {  getAllMovies } from "../controller/movies.controller";

const router = express.Router();
router.use(express.json());

router.get("/", getAllMovies);

export default router;
