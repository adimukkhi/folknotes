import { useEffect } from "react";
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast, { LoaderIcon } from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";

const NoteDetail = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const noteColours = [
        { name: "Default", value: "default", bg: "bg-base-200" },
        { name: "Red", value: "red", bg: "bg-red-200" },
        { name: "Blue", value: "blue", bg: "bg-blue-200" },
        { name: "Green", value: "green", bg: "bg-green-200" },
        { name: "Purple", value: "purple", bg: "bg-purple-200" }
    ];

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            } catch (e) {
                console.log("Error in fetching note.", e);
                toast.error("Failed to Fetch the Note");
            } finally {
                setLoading(false);
            }
        }

        fetchNote();
    }, [id]);

    const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete your note?")) return;

    try {
        await api.delete(`/notes/${id}`);
        toast.success("Note Deleted Successfully");
        navigate("/");
    } catch (e) {
        console.log("Error in deleting", e);
        toast.error("Could not delete note.")
    }
  }
    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Title and Content are Required");
            return ;
        }

        setSaving(true);

        try {
            const res = await api.put(`/notes/${id}`, {
                title: note.title,
                content: note.content,
                colour: note.colour || "default"
            });
            setNote(res.data);

            toast.success("Note Updated Successfully!");
            navigate("/");
        } catch (e) {
            console.log("Error in updating note", e);
            toast.error("Failed to Update Note");
        } finally {
            setSaving(false);
        }

    }

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10"/>
            </div>
        )
    }

  return (
    <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <Link to={"/"} className="btn btn-ghost">
                        <ArrowLeftIcon className="size-5"/>
                        Back to Notes
                    </Link>
                    <button onClick={handleDelete} className="btn btn-error btn-outlinw">
                        <Trash2Icon className="size-5" />
                    </button>
                </div>
                <div className="card bg-base-100">
                    <div className="card-body">
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text ml-2 mb-1.5">Title</span>
                            </label>
                            <input 
                                type="text"
                                placeholder="Note Title"
                                className="input w-full rounded-2xl bg-base-200 border-transparent focus:border-primary focus:bg-base-100 focus:outline-none"
                                value={note.title}
                                onChange={(e) => setNote({ ...note, title: e.target.value })}
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text mb-1.5 ml-2">Content</span>
                            </label>
                            <textarea 
                                placeholder="Write Your Note Here..."
                                className="textarea w-full rounded-2xl bg-base-200 border-transparent focus:border-primary focus:bg-base-100 focus:outline-none"
                                value={note.content}
                                onChange={(e) => setNote({ ...note, content: e.target.value })}
                            />
                        </div>
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text ml-2 mb-2">
                                    Note Colour
                                </span>
                            </label>

                            <div className="flex gap-3 flex-wrap">
                                {noteColours.map((colour) => (
                                    <button
                                        key={colour.value}
                                        type="button"
                                        title={colour.name}
                                        aria-label={colour.name}
                                        onClick={() =>
                                            setNote({ ...note, colour: colour.value })
                                        }
                                        className={`w-9 h-9 rounded-full border-2 ${
                                            colour.bg
                                        } ${
                                            (note.colour || "default") === colour.value
                                                ? "border-primary ring-2 ring-primary ring-offset-2"
                                                : "border-base-300"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NoteDetail