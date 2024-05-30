const Express = require("express");
const app = Express();

// SQLite connection
const db = require("./db");

// Middleware to parse body as JSON
app.use(Express.json());

// Server config
const { port } = require("./config");
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("server listening on PORT: ", port);
});

// Express routes
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./user/routes");
const RecommendationRoutes = require("./recommendation/routes");

// Attach all routes to the app
app.use("/", AuthorizationRoutes);
app.use("/user", UserRoutes);
app.use("/recommendation", RecommendationRoutes);

// Handle 404s
app.use((req, res) => {
    return res.status(404).json({
        error: { message: "Not found" },
    });
});

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
