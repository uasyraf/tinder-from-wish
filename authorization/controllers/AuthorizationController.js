const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const db = require("../../db");
const { jwtSecret, jwtExpirationInSeconds } = require("../../config");

const generateAccessToken = (username, userId) => {
    return jwt.sign(
        {
            userId,
            username,
        },
        jwtSecret,
        {
            expiresIn: jwtExpirationInSeconds,
        }
    );
};

const encryptPassword = (password) => {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
}

const register = async (req, res) => {
    const payload = req.body;

    let encryptedPassword = encryptPassword(payload.password);

    const query = "INSERT INTO users(username, password) VALUES ($1, $2, $3, $4)"
    const values = {
        1: payload.username,
        2: encryptedPassword,
    }

    db.serialize(() => {
        db.run(query, values, function (err) {
            if (err) {
                console.error("error while registering user:", err);
                return res.status(500).json({
                    status: false,
                    error: { message: "Error while registering user" },
                });
            } else {
                const accessToken = generateAccessToken(payload.username, this.lastID);

                return res.status(200).json({
                    status: true,
                    data: {
                        user: {
                            id: this.lastID,
                            username: payload.username,
                        },
                        token: accessToken,
                    }
                });
            }
        });
    });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT FROM users WHERE username = ?";
    const values = [username];

    db.serialize(() => {
        db.get(query, values, (err, row) => {
            if (err) {
                console.error("error while login user:", err);
                return res.status(500).json({
                    status: false,
                    error: { message: "Error while logging in user." },
                });
            } else {
                if (!row) {
                    return res.status(404).json({
                        status: false,
                        error: { message: "User not found" },
                    });
                }

                const encryptedPassword = encryptPassword(password);

                if (row.password !== encryptedPassword) {
                    return res.status(400).json({
                        status: false,
                        error: { message: "Username and password did not match." },
                    });
                }

                const accessToken = generateAccessToken(user.username, row.id);

                return res.status(200).json({
                    status: true,
                    data: {
                        user: {
                            id: row.id,
                            username: row.username,
                        },
                        token: accessToken,
                    }
                });
            }
        });
    });
};

module.exports = { register, login };
