const helmet = require("helmet");
const compression = require("compression");

const Express = require("express");
const app = Express();

// set csp headers to allow bootstrap and jquery
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
        },
    }),
);

// compress all routes for performance
app.use(compression());

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 20,
});

app.use(limiter);

// sqlite connection
const db = require("./db");

// middleware to parse body as JSON
app.use(Express.json());

// Server config
const { port } = require("./config");

app.listen(port, () => {
    console.log("server listening on PORT: ", port);
});

// routes
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./user/routes");
const ProfileRoutes = require("./profile/routes");
const RecommendationRoutes = require("./recommendation/routes");

app.use("/", AuthorizationRoutes);
app.use("/user", UserRoutes);
app.use("/profile", ProfileRoutes);
app.use("/recommendation", RecommendationRoutes);

// 404s
app.use((req, res) => {
    return res.status(404).json({
        error: { message: "Not found" },
    });
});

// middleware to handle internal server error
const ErrorHandlerMiddleware = require("./common/middlewares/ErrorHandlerMiddleware");
app.use(ErrorHandlerMiddleware.handler);

process.on("SIGINT", () => {
    db.close((err) => {
        if (err) {
            console.error("error while closing the database connection:", err.message);
        } else {
            console.log("database closed");
        }
        process.exit("successfully shut down app");
    });
})
