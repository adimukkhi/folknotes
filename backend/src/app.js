import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notes.routes.js";
import { connectDB } from "./config/db.config.js";
import { rateLimiter } from "./middleware/ratelimiter.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();


// This middleware parses JSON bodies: req.body
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
    app.use(cors());
}

app.use(rateLimiter);

// Middleware - Shi which happens b/w req and res
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} and URL is ${req.url}`);
//     next();
// });
    
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {    
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}...`)
    });
});
