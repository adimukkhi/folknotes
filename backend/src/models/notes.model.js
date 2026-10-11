import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, content: {
        type: String,
        required: true
    }, isFavourite: {
        type: Boolean,
        default: false
    }, colour: {
        type: String,
        default: "default"
    }
}, { timestamps: true });

const Note = mongoose.model("Notes", noteSchema);
export default Note;