import { Link } from 'react-router';
import { PlusIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const themes = [
        "light", "dark", "cupcake", "bumblebee",
        "emerald", "corporate", "synthwave", "retro",
        "cyberpunk", "valentine", "halloween", "garden",
        "forest", "aqua", "lofi", "pastel", "fantasy",
        "wireframe", "black", "luxury", "dracula", "cmyk",
        "autumn", "business", "acid", "lemonade", "night",
        "coffee", "winter", "dim", "nord"
    ];

    const [theme, setTheme] = useState(
        () => localStorage.getItem("notes-theme") || "synthwave"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("notes-theme", theme);
    }, [theme]);

  return (
    <header className='bg-base-300 border-b border-base-content/10'>
        <div className='mx-auto max-w-6xl p-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>FolkNotes</h1>
                <div className="flex items-center gap-3">
                    <select
                        className="select select-bordered select-sm w-32 sm:w-40"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        aria-label="Choose theme"
                    >
                        {themes.map((item) => (
                            <option key={item} value={item}>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </option>
                        ))}
                    </select>

                    <Link to="/create" className="btn btn-primary rounded-full">
                        <PlusIcon className="size-5" />
                        <span>New Note</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar