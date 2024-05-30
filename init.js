const db = require("./db");

const createTables = async () => {
    try {
        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE,
                    password TEXT
                );
            `);

            db.run(`
                CREATE TABLE IF NOT EXISTS profiles (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    name TEXT,
                    gender TEXT,
                    location TEXT,
                    university TEXT,
                    interests TEXT,
                    FOREIGN KEY(user_id) REFERENCES users(id)
                );
            `);

            db.run(`
                CREATE TABLE IF NOT EXISTS recommendations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    profile_id INTEGER,
                    score REAL,
                    timestamp INT,
                    FOREIGN KEY(user_id) REFERENCES users(id),
                    FOREIGN KEY(profile_id) REFERENCES profiles(id)
                );
            `);
        })
        console.log("Tables created successfully");
    } catch (err) {
        console.error("error creating tables:", err);
    } finally {
        db.close();
    }
};

createTables();
