const db = require("../../db");

const find = async (req, res, next) => {
    try {
        const {
            user: { userId }
        } = req;

        const query = "SELECT * FROM profiles WHERE user_id = ?";

        db.run(query, [userId], (err) => {
            if (err) {
                return next(err);
            } else {
                return res.status(200).json({
                    status: true,
                    data: { message: "Profile retrieved successfully for user" },
                });
            }
        });
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const {
            user: { userId }
        } = req;

        const {
            name,
            gender,
            location,
            university,
            interests,
        } = req.body;

        const query = `
            INSERT INTO
                profiles (user_id, name, gender, location, university, interests)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = {
            1: userId,
            2: name,
            3: gender,
            4: location,
            5: university,
            6: interests,
        };

        db.run(query, values, (err) => {
            if (err) {
                return next(err);
            } else {
                return res.status(200).json({
                    status: true,
                    data: { message: "Profile created successfully for user" },
                });
            }
        });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const {
            user: { userId }
        } = req;

        const {
            name,
            gender,
            location,
            university,
            interests,
        } = req.body;

        const query = `
            UPDATE 
                profiles
            SET name = ?,
                gender = ?,
                location = ?,
                university = ?,
                interests = ?
            WHERE
                user_id = ?
        `;
        const values = [
            name,
            gender,
            location,
            university,
            interests,
            userId,
        ];

        db.run(query, values, (err) => {
            if (err) {
                return next(err);
            } else {
                return res.status(200).json({
                    status: true,
                    data: { message: "Profile updated successfully for user" },
                });
            }
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { find, create, update }
