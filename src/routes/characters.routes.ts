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

const router = express.Router();
router.use(express.json());

router.get("/", getAllCharacters);
router.get("/:id", checkIdValid, getCharacterByID);
router.post("/", checkBodyValid, createCharacter);
router.put("/:id", checkIdValid, updateCharacter);
router.delete("/:id", checkIdValid, deleteCharacter);

export default router;
