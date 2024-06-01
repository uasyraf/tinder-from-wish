const sqlite3 = require("sqlite3").verbose();

const path = require("path");

const dbPath = path.join("./storage", "data.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("error when opening database connection:", err.message);
    } else {
        console.log("connected to the database");
    }
});

module.exports = db;