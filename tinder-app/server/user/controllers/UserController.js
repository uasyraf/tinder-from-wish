const db = require("../../db");

const find = async (req, res, next) => {
    try {
        const {
            user: { userId },
        } = req;

        const query = "SELECT id, username FROM users WHERE id = ?";
        const values = [userId];

        db.get(query, values, (err, row) => {
            if (err) {
                return next(err);
            } else {
                if (!row) {
                    return res.status(404).json({
                        status: false,
                        error: { message: "Requested user not found." },
                    });
                }

                return res.status(200).json({
                    status: true,
                    user: row,
                });
            }
        });
    } catch (err) {
        next(err);
    }
}

const list = async (req, res, next) => {
    try {
        const {
            user: { userId },
        } = req;

        const query = "SELECT id, username FROM users";

        db.all(query, (err, rows) => {
            if (err) {
                return next(err);
            } else {
                return res.status(200).json({
                    status: true,
                    users: rows,
                });
            }
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { find, list }