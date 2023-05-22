import express from "express";
import { checkIdValid } from "../middleware/validation.middleware";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovieByID,
  updateMovie,
} from "../controller/movies.controller";
import { checkBodyValid } from "../middleware/character.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllMovies);
router.get("/:id", checkIdValid, getMovieByID);
router.post("/", checkBodyValid, createMovie);
router.put("/:id", checkIdValid, updateMovie);
router.delete("/:id", checkIdValid, deleteMovie);

export default router;
