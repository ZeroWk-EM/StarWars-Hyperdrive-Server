import express from "express";
import { checkIdValid } from "../middleware/validation.middleware";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovieByID,
  updateMovie,
} from "../controller/movies.controller";
import { checkBodyValid } from "../middleware/movie.middleware";
import { isAuth } from "../middleware/user.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllMovies);
router.get("/:id", checkIdValid, getMovieByID);
router.post("/", isAuth, checkBodyValid, createMovie);
router.put("/:id", isAuth, checkIdValid, updateMovie);
router.delete("/:id", isAuth, checkIdValid, deleteMovie);

export default router;
