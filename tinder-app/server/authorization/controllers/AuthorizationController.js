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

const register = async (req, res, next) => {
    try {
        const payload = req.body;

        let encryptedPassword = encryptPassword(payload.password);

        const query = "INSERT INTO users (username, password) VALUES ($1, $2)"
        const values = {
            1: payload.username,
            2: encryptedPassword,
        }

        db.run(query, values, function (err) {
            if (err) {
                return next(err)
            } else {
                const accessToken = "Bearer " + generateAccessToken(payload.username, this.lastID);

                return res.status(200).json({
                    status: true,
                    user: {
                        id: this.lastID,
                        username: payload.username,
                        password: encryptedPassword,
                    },
                    token: accessToken,
                });
            }
        });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const query = "SELECT * FROM users WHERE username = ?";
        const values = [username];

        db.get(query, values, (err, row) => {
            if (err) {
                return next(err)
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

                const accessToken = "Bearer " + generateAccessToken(username, row.id);

                return res.status(200).json({
                    status: true,
                    user: row,
                    token: accessToken,

                });
            }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { register, login, encryptPassword };
