import ratelimit from "../config/upstash.config.js";

export const rateLimiter = async (req, res, next) => {
    try {
        const ip = req.ip;
        const { success } = await ratelimit.limit(ip);

        if (!success) return res.status(429).json({ message: "Too many requests, please try later." });
        next();
    } catch (e) {
        console.log("Rate limit error", e);
        next(e);
    }
}