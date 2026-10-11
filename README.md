📝 FolkNotes

A full-stack notes application built with the MERN stack, featuring customizable themes, colour-coded notes, favourites, search, sorting, and a responsive UI.

Organize your thoughts and manage your notes with a clean, customizable interface.

✨ Features
📝 Notes Management
Create Notes — Create notes with a title, content, and custom colour.
View Notes — Browse all your notes in one place.
Edit Notes — Update note titles, content, and colours.
Delete Notes — Delete notes with a confirmation prompt.
Timestamps — Automatically track when notes are created and updated.
⭐ Organization & Productivity
Favourites — Mark important notes as favourites and filter them separately.
Search — Search notes by title or content.
Sorting — Sort notes by recently updated, newest created, or oldest created.
Grid & List Views — Switch between grid and list layouts.
Copy to Clipboard — Copy note content with a single click.
🎨 Customization
31 DaisyUI Themes — Choose from themes such as Dark, Cupcake, Synthwave, Cyberpunk, Dracula, and more.
Persistent Theme Selection — Your selected theme is saved in local storage.
Colour-Coded Notes — Choose from five colours: Default, Red, Blue, Green, and Purple.
Responsive UI — Built with Tailwind CSS and DaisyUI.
⚡ User Experience
Loading indicators and empty states.
Toast notifications for success and errors.
Form validation for required fields.
Rate-limit notifications when too many requests are made.
Reusable React components and client-side routing.
🛡️ Backend
RESTful API built with Express.js.
MongoDB database integration using Mongoose.
Upstash Redis-powered rate limiting.
Automatic creation and update timestamps.
API responses for missing notes and rate-limited requests.
🛠️ Tech Stack

Frontend

React 19
Vite
Tailwind CSS v4
DaisyUI v5
React Router
Axios
React Hot Toast
Lucide React

Backend

Node.js
Express.js
MongoDB
Mongoose
Upstash Redis
@upstash/ratelimit
CORS
dotenv
🏗️ Architecture

FolkNotes uses a client-server architecture. The React frontend communicates with the Express REST API, which processes requests and interacts with MongoDB. Upstash Redis handles rate limiting.

FolkNotes/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── NoteCard.jsx
│       │   ├── NotesNotFound.jsx
│       │   └── RateLimit.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Create.jsx
│       │   └── NoteDetail.jsx
│       ├── lib/
│       │   └── axios.js
│       ├── index.css
│       └── main.jsx
│
└── backend/
    ├── config/
    │   ├── db.config.js
    │   └── upstash.config.js
    ├── controllers/
    │   └── notes.controller.js
    ├── middleware/
    │   └── ratelimiter.middleware.js
    ├── models/
    │   └── notes.model.js
    ├── routes/
    │   └── notes.routes.js
    ├── server.js
    └── package.json


The structure above illustrates the main project files. Your actual repository may contain additional files.

🔄 Request Flow
The user interacts with the React frontend.
Axios sends HTTP requests to the Express API.
Express middleware parses JSON, handles CORS, and applies rate limiting.
Controllers use Mongoose to perform database operations.
The API returns JSON responses.
React updates the interface and displays notifications.
🗃️ Note Model

Each note contains:

Field	Type	Description
title	String	Note title
content	String	Note content
isFavourite	Boolean	Favourite status; defaults to false
colour	String	Note colour; defaults to default
createdAt	Date	Creation timestamp
updatedAt	Date	Last-update timestamp

Mongoose automatically manages the timestamps.

🔌 API Endpoints

All endpoints are mounted under /api/notes.

Method	Endpoint	Description
GET	/api/notes	Get all notes
GET	/api/notes/:id	Get a note by ID
POST	/api/notes	Create a note
PUT	/api/notes/:id	Update a note
DELETE	/api/notes/:id	Delete a note
PATCH	/api/notes/:id/favourite	Toggle favourite status

The API uses Upstash Redis to limit requests to 10 per 10 seconds per rate-limit key.

🚀 Run Locally

Want to try FolkNotes on your own PC or create your own version? Follow these steps.

Prerequisites

Install the following:

Node.js and npm
Git
A MongoDB Atlas account or a local MongoDB instance.
An Upstash account with a Redis database.
1. Clone the Repository

Open your terminal and run:

git clone https://github.com/YOUR_USERNAME/FolkNotes.git
cd FolkNotes


Replace YOUR_USERNAME/FolkNotes with the actual GitHub repository path.

Alternatively, fork the repository on GitHub first if you want your own copy to modify.

2. Install Dependencies

Install the frontend dependencies:

cd frontend
npm install


Install the backend dependencies in a separate terminal:

cd backend
npm install

3. Set Up Environment Variables

Create a .env file inside the backend/ directory:

PORT=5001
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token


Replace the placeholder values with your actual credentials.

MONGO_URI: Your MongoDB connection string.
UPSTASH_REDIS_REST_URL: Your Upstash Redis REST URL.
UPSTASH_REDIS_REST_TOKEN: Your Upstash Redis REST token.
PORT: The backend port; defaults to 5001.

Important: Never share your credentials or commit your .env file to GitHub.

4. Configure the Frontend API URL

Open frontend/src/lib/axios.js and make sure the Axios base URL points to your local backend.

For example:

baseURL: "http://localhost:5001/api"


Use the configuration format already present in your Axios file.

5. Start the Backend

Open a terminal:

cd backend
node server.js


If your backend has a development script configured, you can use npm run dev instead.

Wait for the MongoDB connection to succeed and the server to start.

6. Start the Frontend

Open a second terminal:

cd frontend
npm run dev


Vite will display a local URL in your terminal, usually:

http://localhost:5173


Open that URL in your browser and start creating notes!

📌 Quick Start Checklist
Node.js and Git installed.
Repository cloned.
Frontend and backend dependencies installed.
MongoDB connection configured.
Upstash Redis credentials configured.
Frontend Axios URL points to the local backend.
Backend and frontend both running.
🐛 Troubleshooting

MongoDB connection error

Check your MONGO_URI.
If using MongoDB Atlas, ensure your database user and network access settings are configured correctly.

Rate-limit errors

Check your Upstash Redis URL and token.
The API allows 10 requests per 10 seconds per rate-limit key.

Frontend cannot reach the backend

Confirm the backend is running on port 5001, or your configured port.
Verify the Axios base URL includes /api.

Dependencies or commands failing

Check that Node.js and npm are installed.
Run npm install in both the frontend/ and backend/ directories.

Built with ❤️ using React, Express, MongoDB, Tailwind CSS, and DaisyUI.