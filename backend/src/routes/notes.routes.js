import express from "express";
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote, toggleFavourite } from "../controllers/notes.controller.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.patch("/:id/favourite", toggleFavourite);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;