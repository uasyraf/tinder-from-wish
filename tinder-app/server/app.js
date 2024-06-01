const helmet = require("helmet");
const compression = require("compression");

const express = require("express");
const app = express();

// set csp headers to allow bootstrap and jquery
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
            "connect-src": ["'self'", 'https://robohash.org'],
            "img-src": ["'self'", 'https://robohash.org'],
        },
    }),
);

// compress all routes for performance
app.use(compression());

// limit requests
// const RateLimit = require("express-rate-limit");
// const limiter = RateLimit({
//     windowMs: 1 * 60 * 1000, // 1 minute window
//     max: 100,
// });

// app.use(limiter);

// middleware to parse body as JSON
app.use(express.json());

const { port } = process.env.PORT | require("./config");

app.listen(port, '0.0.0.0', () => {
    console.log("server listening on PORT: ", port);
});

// routes
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./user/routes");
const ProfileRoutes = require("./profile/routes");
const RecommendationRoutes = require("./recommendation/routes");

app.use("/auth", AuthorizationRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/profile", ProfileRoutes);
app.use("/api/recommendation", RecommendationRoutes);

// expose static files and react app to client
const path = require("path");

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.use((req, res) => { // not found route
    return res.status(404).json({
        error: { message: "Not found" },
    });
});

// middleware to handle internal server error
const errorHandlerMiddleware = require("./common/middlewares/ErrorHandlerMiddleware");

app.use(errorHandlerMiddleware.handler);

// close sqlite connection
const db = require("./db");
process.on("SIGINT", () => {
    db.close((err) => {
        if (err) {
            console.error("error while closing the database connection:", err.message);
        } else {
            console.log("database closed");
        }
        process.exit("successfully shut down app");
    });
});
