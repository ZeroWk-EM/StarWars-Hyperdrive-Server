import express from "express";
import {
  createCharacter,
  deleteCharacter,
  getAllCharacters,
  getCharacterByID,
  updateCharacter,
} from "../controller/characters.controller";
import { checkIdValid } from "../middleware/validation.middleware";
import { checkBodyValid } from "../middleware/character.middleware";
import { isAuth } from "../middleware/user.middleware";

const router = express.Router();
router.use(express.json());

router.get("/", getAllCharacters);
router.get("/:id", checkIdValid, getCharacterByID);
router.post("/", isAuth, checkBodyValid, createCharacter);
router.put("/:id", isAuth, checkIdValid, updateCharacter);
router.delete("/:id", isAuth, checkIdValid, deleteCharacter);

export default router;
