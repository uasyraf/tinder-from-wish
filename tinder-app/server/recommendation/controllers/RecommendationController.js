const db = require("../../db");

const insertRecommendations = (userId, profiles) => {
    return new Promise((resolve, reject) => {
        const timestamp = Math.floor(Date.now() / 1000);

        let placeholders = profiles.map(() => "(?, ?, ?, ?)").join(", ");
        const query = "INSERT INTO recommendations (user_id, profile_id, score, timestamp) VALUES " + placeholders;
        let values = [];

        profiles.forEach((profile) => {
            values.push(userId);
            values.push(profile["id"]);
            values.push(profile["score"]);
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

const generateRecommendations = (userId, randomnessWeight, max) => {
    return new Promise((resolve, reject) => {
        if (randomnessWeight > 1 || randomnessWeight < 0)
            return reject({ error: "randomness weight must be within range 0 < randomnessWeight < 1", data: [] });

        const query = `        
            WITH user_profile AS (
                SELECT * FROM profiles WHERE user_id = $1
            )
            SELECT 
                p.*,
                (
                    CASE 
                        WHEN LOWER(p.university) = LOWER(up.university) THEN 2
                        ELSE 0
                    END +
                    CASE 
                        WHEN LOWER(p.interests) LIKE '%' || LOWER(up.interests) || '%' THEN 2
                        ELSE 0
                    END +
                    ABS(RANDOM() % 10000) * $2
                ) AS score
            FROM profiles p, user_profile up
            WHERE p.user_id != $1
            AND p.id NOT IN (SELECT profile_id FROM recommendations WHERE user_id = $1)
            AND up.user_id = $1
            AND p.gender != up.gender
            ORDER BY score DESC
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

const listRecommendations = (userId) => {
    return new Promise((resolve, reject) => {
        let startOfDayTimestamp = new Date().setHours(0, 0, 0, 0);
        startOfDayTimestamp = Math.floor(startOfDayTimestamp / 1000);

        let endOfDayTimestamp = new Date().setHours(23, 59, 59, 999);
        endOfDayTimestamp = Math.floor(endOfDayTimestamp / 1000);

        const query = `
            SELECT
                profiles.*, recommendations.score
            FROM recommendations
            LEFT JOIN profiles ON recommendations.profile_id = profiles.id
            WHERE recommendations.user_id = $1
            AND recommendations.timestamp >= $2
            AND recommendations.timestamp <= $3
            ORDER BY recommendations.score DESC;
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
    });
};

const list = async (req, res, next) => {
    const {
        user: { userId }
    } = req;

    return listRecommendations(userId)
        .then((profiles) => {
            if (!profiles.length || profiles.length < 10) {
                var max = (0 < profiles.length < 10) ? 10 - profiles.length : 10;

                return generateRecommendations(userId, 0.3, max)
                    .then((profiles) => {
                        if (!profiles.length) {
                            return [];
                        } else {
                            return insertRecommendations(userId, profiles);
                        }
                    });
            } else {
                return profiles;
            }
        })
        .then((profiles) => {
            if (profiles.length === 10) {
                return profiles;
            } else {
                return listRecommendations(userId);
            }
        })
        .then((profiles) => {
            return res.status(200).json({
                status: true,
                profiles: profiles,
            })
        })
        .catch(err => next(err));
};

module.exports = { list };
