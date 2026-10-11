import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { LayoutGrid, List } from 'lucide-react';

import api from '../lib/axios.js';
import Navbar from '../components/Navbar.jsx';
import RateLimit from '../components/RateLimit.jsx';
import NoteCard from '../components/NoteCard.jsx';
import NotesNotFound from '../components/NotesNotFound.jsx';

const Home = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("updated");
    const [viewMode, setViewMode] = useState("grid");
    const [activeSection, setActiveSection] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");
                setNotes(res.data);
                setIsRateLimited(false);
            } catch (e) {
                console.log("Error fetching notes:", e);
                if (e.response.status == 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes.")
                }
            } finally {
                setLoading(false);
            }
        }

        fetchNotes();
    }, []);

    const filteredNotes = notes.filter((note) => {
        const matchesSection = activeSection === "all" || note.isFavourite;
        const query = searchQuery.toLowerCase().trim();

        const matchesSearch = note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query);
        
        return matchesSection && matchesSearch;
    });

    const sortedNotes = [...filteredNotes].sort((a, b) => {
        if (sortBy === "updated") {
            return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
        }
        if (sortBy === "newest") {
            return new Date(b.createdAt) - new Date(a.createdAt)
        }
        if (sortBy === "oldest") {
            return new Date(a.createdAt) - new Date(b.createdAt)
        }

        return 0;
    });

  return (
    <div className='min-h-screen'>
        <Navbar />
        {isRateLimited && <RateLimit />}

        <div className='max-w-7xl mx-auto p-4 mt-6'>
            <div className='flex gap-3 mb-6'>
                <button onClick={() => setActiveSection("all")} className={`btn ${activeSection === "all" ? "btn-primary" : "btn-ghost"}`}>
                    All Notes
                </button>
                <button onClick={() => setActiveSection("favourites")} className={`btn ${activeSection === "favourites" ? "btn-primary" : "btn-ghost"}`}>
                    ⭐ Favourites
                </button>
            </div>
            {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

            {!loading && !isRateLimited && sortedNotes.length === 0 && (
                activeSection === "all" ? (
                    <NotesNotFound />
                ) : (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-4">⭐</div>
                        <h2 className="text-xl font-semibold">
                            No favourites yet
                        </h2>
                        <p className="text-base-content/60 mt-2">
                            Star a note to find it here.
                        </p>
                        <button
                            className="btn btn-primary mt-4"
                            onClick={() => setActiveSection("all")}
                        >
                            Browse all notes
                        </button>
                    </div>
                )
            )}

            {!loading && sortedNotes.length > 0 && !isRateLimited && (
                <>
                    <div>
                        <div className="flex justify-end mb-4">
                            <select 
                                className='select select-bordered'
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                aria-label='Sort Notes'
                            >
                                <option value="updated">Recently Updated</option>
                                <option value="newest">Newest Created</option>
                                <option value="oldest">Oldest Created</option>
                            </select>
                        </div>
                        <div className='flex items-center gap-2 mb-4'>
                            <button className='btn btn-square btn-ghost' onClick={() => setViewMode("grid")} aria-label='Grid View' title='Grid View'>
                                <LayoutGrid size={20}/>
                            </button>
                            <button className='btn btn-square btn-ghost' onClick={() => setViewMode("list")} aria-label='List View' title='List View'>
                                <List size={20}/>
                            </button>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    placeholder="Search notes by title or content..."
                                    className="input input-bordered w-full mt-4"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    aria-label="Search notes"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={viewMode === "grid" ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : "flex flex-col gap-4"}>
                        {sortedNotes.map(note => (
                            <div>
                                <NoteCard key={note._id} note={note} setNotes={setNotes} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    </div>
  )
}

export default Home