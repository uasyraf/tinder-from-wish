const Express = require("express");
const app = Express();

// SQLite connection
const db = require("./db");

// Middleware to parse body as JSON
app.use(Express.json());


// Server config
const { port } = require("./config");

app.listen(port, () => {
    console.log("server listening on PORT: ", port);
});

// Express routes
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./user/routes");
const ProfileRoutes = require("./profile/routes");
const RecommendationRoutes = require("./recommendation/routes");

// Attach all routes to the app
app.use("/", AuthorizationRoutes);
app.use("/user", UserRoutes);
app.use("/profile", ProfileRoutes);
app.use("/recommendation", RecommendationRoutes);

// Handle 404s
app.use((req, res) => {
    return res.status(404).json({
        error: { message: "Not found" },
    });
});

// Middleware to handle internal server error
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
