const db = require("../../db");

const find = async (req, res) => {
    const {
        user: { userId },
    } = req;
    const query = "SELECT id, username FROM users FROM users WHERE id = ?";
    const values = [userId];

    db.serialize(() => {
        db.get(query, values, (err, row) => {
            if (err) {
                console.error("error while fetching user:", err);
                return res.status(500).json({
                    status: false,
                    error: { message: "Error while fetching user." },
                });
            } else {
                if (!row) {
                    return res.status(404).json({
                        status: false,
                        error: { message: "Requested user not found." },
                    });
                }

                return res.status(200).json({
                    status: true,
                    data: row,
                });
            }
        });
    });
}

const list = async (req, res) => {
    const {
        user: { userId },
    } = req;
    const query = "SELECT id, username FROM users";
    const values = [userId];

    db.serialize(() => {
        db.all(query, values, (err, rows) => {
            if (err) {
                console.error("error while fetching all users:", err);
                return res.status(500).json({
                    status: false,
                    error: { message: "Error while fetching all users." },
                });
            } else {
                return res.status(200).json({
                    status: true,
                    data: rows,
                });
            }
        });
    });
}

module.exports = { find, list }