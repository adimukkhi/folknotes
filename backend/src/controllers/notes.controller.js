import Note from "../models/notes.model.js";

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (e) {
        res.status(500).json({ message: "Internal Server Error." });
        console.log("Error in notes.controller.js, getAllNotes", e);
    }
}

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not Found." });

        res.status(200).json(note);
    } catch (e) {
        res.status(500).json({ message: "Internal Server Error." });
        console.log("Error in notes.controller.js, getAllNotes", e);
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content, colour } = req.body;
        const newNote = new Note({ title, content, colour });

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (e) {
        res.status(500).json({ message: "Internal Server Error." });
        console.log("Error in notes.controller.js, createNote", e);
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content, colour } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content, colour }, { new: true, runValidators: true });

        if (!updatedNote) return res.status(404).json({ message: "Note not Found." })

        res.status(200).json(updatedNote);
    } catch (e) {
        res.status(500).json({ message: "Internal Server Error." });
        console.log("Error in notes.controller.js, updateNote", e);
    }
}

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) return res.status(404).json({ message: "Note not Found." });

        res.status(200).json({ message: "Note deleted successfully." });
    } catch (e) {
        res.status(500).json({ message: "Internal Server Error." });
        console.log("Error in notes.controller.js, deleteNote", e);
    }
}

export const toggleFavourite = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found." })
        }

        note.isFavourite = !note.isFavourite;
        const updatedNote = await note.save({ timestamps: false });
        res.status(200).json(updatedNote);
    } catch (e) {
        console.log("Error toggling favorite:", e);
        res.status(500).json({ message: "Internal Server Error." });
    }
}