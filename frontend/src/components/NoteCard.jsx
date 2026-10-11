import { Link } from 'react-router';
import { PenSquareIcon, Trash2Icon, CopyIcon, Star } from 'lucide-react';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';

const NoteCard = ({ note, setNotes }) => {
    const colourClasses = {
        default: "bg-base-100",
        red: "bg-error/10",
        blue: "bg-info/10",
        green: "bg-success/10",
        purple: "bg-secondary/10"
    };

  const handleDelete = async (e, id) => {
    e.preventDefault(); // no nav

    if(!window.confirm("Are you sure you want to delete your note?")) return;

    try {
        await api.delete(`/notes/${id}`);
        setNotes((prev) => prev.filter(note => note._id !== id));
        toast.success("Note Deleted Successfully");
    } catch (e) {
        console.log("Error in deleting", e);
        toast.error("Could not delete note.")
    }
  }

  const handleCopy = async (e) => {
    e.preventDefault();

    try {
        await navigator.clipboard.writeText(`${note.content}`);
        toast.success("Copied Note to Clipboard");
    } catch (e) {
        console.log("Error in note copying", e);
        toast.error("Failed to Copy Note");
    }
  }

  const handleFavourite = async (e) => {
    e.preventDefault();

    try {
        const res = await api.patch(`/notes/${note._id}/favourite`);
        setNotes((prev) => prev.map((n) => n._id === note._id ? res.data : n));

        toast.success(res.data.isFavourite ? "Added to Favourites!" : "Removed from Favourites");
    } catch (e) {
        console.log("Error updating favourite:", e);
        toast.error("Could not update favourite.");
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const suffix = 
        day >= 11 && day <= 13
            ? "th"
            : day % 10 === 1
            ? "st"
            : day % 10 === 2
            ? "nd"
            : day % 10 === 3
            ? "rd"
            : "th";

    const month = date.toLocaleString("en-GB", {
        month: "long"
    });

    const year = date.getFullYear();

    const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });

    return `${day}${suffix} ${month} ${year}, ${time}`
  }

  return (
    <Link
    className={`card ${
        colourClasses[note.colour] || colourClasses.default
    } hover:shadow-xl transition-all duration-200 border-t-4 border-primary`}
    to={`/note/${note._id}`}>
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content/60'>
                    {formatDate(note.updatedAt || note.createdAt)}
                </span>
                <div className='flex items-center gap-2'>
                    <button className='btn btn-ghost btn-xs text-base-content hover:bg-base-200 transition-all duration-200'>
                        <PenSquareIcon className='size-4 transition-transform hover:scale-110'/>
                    </button>
                    <button className='btn btn-ghost btn-xs text-error hover:bg-error/10 hover:text-error transition-all duration-200' onClick={(e) => handleDelete(e, note._id)}>
                        <Trash2Icon className='size-4 transition-transform hover:scale-110'/>
                    </button>
                    <button className='btn btn-ghost btn-xs' onClick={handleCopy} aria-label='Copy Note' title='Copy Note'>
                        <CopyIcon className='size-4'/>
                    </button>
                    <button 
                        className='btn btn-ghost btn-xs' 
                        onClick = {handleFavourite} 
                        aria-label = {note.isFavourite ? "Remove from Favourites" : "Add to Favourites"}
                        title = {note.isFavourite ? "Remove from Favourites" : "Add to Favourites"}
                    >
                        <Star className={`size-4 ${note.isFavourite ? "fill-yellow-400 text-yellow-400" : ""}`}/>
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard