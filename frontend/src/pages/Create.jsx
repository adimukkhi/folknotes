import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';
import toast from 'react-hot-toast';

import api from '../lib/axios.js';

const Create = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [colour, setColour] = useState("default");

    const noteColours = [
        { name: "Default", value: "default", bg: "bg-base-200" },
        { name: "Red", value: "red", bg: "bg-red-200" },
        { name: "Blue", value: "blue", bg: "bg-blue-200" },
        { name: "Green", value: "green", bg: "bg-green-200" },
        { name: "Purple", value: "purple", bg: "bg-purple-200" }
    ];

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.error("Title and Content are Required.");
            return;
        }

        setLoading(true);
        try {
            await api.post("/notes", { title, content, colour });
            toast.success("Note Created Successfully!");
            navigate("/");
        } catch (e) {
            console.log("Error creating note", e);
            if (e.response.status === 429) {
                toast.error("Too many requests folk", {duration: 4000, icon: "💔"});
            } else {
                toast.error("Failed to Create Note, Please Try Again. :(");
            }
        } finally {
            setLoading(false);
        }
    }


  return (
    <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2xl mx-auto'>
                <Link to={"/"} className='btn btn-ghost mb-6'>
                    <ArrowLeftIcon className='size-5'/>
                    Back to Notes
                </Link>

                <div className='card bg-base-100'>
                    <div className='card-body'>
                        <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text mb-1 ml-2'>Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your note title..."
                                    className="input w-full rounded-2xl bg-base-200 border-transparent focus:border-primary focus:bg-base-100 focus:outline-none"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text mb-1 ml-2'>Content</span>
                                </label>
                                <textarea
                                    type="text"
                                    placeholder="Enter your note title..."
                                    className="textarea w-full rounded-2xl bg-base-200 border-transparent focus:border-primary focus:bg-base-100 focus:outline-none"
                                    value={content}
                                    rows={6}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div className="form-control mb-6">
                                <label className="label">
                                    <span className="label-text mb-2 ml-2">
                                        Note Colour
                                    </span>
                                </label>

                                <div className="flex gap-3 flex-wrap">
                                    {noteColours.map((item) => (
                                        <button
                                            key={item.value}
                                            type="button"
                                            title={item.name}
                                            aria-label={item.name}
                                            onClick={() => setColour(item.value)}
                                            className={`w-9 h-9 rounded-full border-2 ${
                                                item.bg
                                            } ${
                                                colour === item.value
                                                    ? "border-primary ring-2 ring-primary ring-offset-2"
                                                    : "border-base-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="card-actions justify-end">
                                <button type='submit' className='btn btn-primary' disabled={loading}>
                                    {loading ? "Creating..." : "Create Note"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Create