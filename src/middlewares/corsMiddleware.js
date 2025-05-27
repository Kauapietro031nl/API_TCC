const cors = require("cors");

const allowedOrigins = ["http://localhost:5500", "http://127.0.0.1:5500"];

const corsMiddleware = cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Origin not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
});

module.exports = corsMiddleware;
