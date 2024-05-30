const db = require("../../db");

const insertRecommendations = async (userId, profiles) => {
    return new Promise((resolve, reject) => {
        const timestamp = Math.floor(Date.now() / 1000);

        let placeholders = rows.map(() => "(?, ?, ?)").join(", ");
        const query = "INSERT INTO recommendations (user_id, profile_id, timestamp) VALUES " + placeholders;
        let values = [];

        profiles.forEach((profile) => {
            values.push(userId);
            values.push(profile["profile_id"]);
            values.push(timestamp);
        });

        db.run(query, values, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(profiles);
            }
        });
    });
};

const generateRecommendations = async (userId, randomnessWeight, max) => {
    return new Promise((resolve, reject) => {
        if (randomnessWeight > 1 || randomnessWeight < 0)
            return reject({ error: "randomness weight must be within range 0 < randomnessWeight < 1", data: [] });

        const query = `
                SELECT 
                    p.*,
                    (
                        CASE 
                            WHEN LOWER(p.university) = (u.university) THEN 2
                            ELSE 0
                        END +
                        CASE 
                            WHEN LOWER(p.interests) LIKE '%' || LOWER(u.interests) || '%' THEN 2
                            ELSE 0
                        END +
                        ABS(RANDOM()) * $2
                    ) AS weight
                FROM profiles p, profiles u
                WHERE p.user_id != $1
                AND u.user_id = $1
                AND p.gender != u.gender
                AND p.id NOT IN (SELECT profile_id FROM recommendations WHERE user_id = $1)
                ORDER BY weight DESC
                LIMIT $3;
            `;
        const values = {
            1: userId,
            2: randomnessWeight,
            3: max,
        };

        db.all(query, values, (err, profiles) => {
            if (err) {
                reject(err);
            } else {
                resolve(profiles);
            }
        });
    });
};

const listRecommendations = async (userId) => {
    return new Promise((resolve, reject) => {
        let startOfDayTimestamp = new Date().setHours(0, 0, 0, 0);
        startOfDayTimestamp = Math.floor(startOfDayTimestamp / 1000);

        let endOfDayTimestamp = new Date().setHours(23, 59, 59, 999);
        endOfDayTimestamp = Math.floor(endOfDayTimestamp / 1000);

        const query = `
                SELECT
                    *
                FROM profiles
                WHERE id in (
                    SELECT 
                        profile_id
                    FROM recommendations
                    WHERE user_id = $1
                    AND timestamp >= $2
                    AND timestamp <= $3
                )
            `;
        const values = {
            1: userId,
            2: startOfDayTimestamp,
            3: endOfDayTimestamp,
        }

        db.all(query, values, (err, profiles) => {
            if (err) {
                reject(err);
            } else {
                resolve(profiles);
            }
        });
    })
};

const list = async (req, res, next) => {
    try {
        const {
            user: { userId }
        } = req;

        let profiles = [];
        db.serialize(async () => {
            profiles = await listRecommendations(userId);

            if (!profiles.length) {
                const newProfiles = await generateRecommendations(userId, 0.3, 10);
                profiles = await insertRecommendations(userId, newProfiles);
            }
        });

        return res.status(200).json({
            status: true,
            data: profiles,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { list };
