const { faker } = require("@faker-js/faker");
const db = require("./db");
const { encryptPassword } = require("./authorization/controllers/AuthorizationController");

const interestsPool = [
    "reading",
    "traveling",
    "cooking",
    "sports",
    "music",
    "movies",
    "hiking",
    "photography",
    "painting",
    "dancing",
    "gaming",
    "coding",
];

const universityPool = [
    "Universiti Teknologi Malaysia",
    "Universiti Malaya",
    "Sunway College",
    "Universiti Teknologi Petronas",
    "Harvard University",
    "Politeknik Sultan Azlan Shah",
    "Universiti Putra Malaysia",
    "Moscow University",
    "Massachusetts Institute of Technology",
];

const genRandomNumber = (max) => Math.floor(Math.random() * max);

const insertUser = (username, password) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
};

const listUsers = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT id FROM users', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const insertProfile = (profile) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO profiles (user_id, name, gender, location, university, interests) VALUES (?, ?, ?, ?, ?, ?)',
            [profile.userId, profile.name, profile.gender, profile.location, profile.university, profile.interests],
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
    });
};

const generateDummyData = async () => {
    try {
        for (let i = 0; i < 100; i++) {
            const username = faker.internet.userName().toLowerCase();
            const password = encryptPassword(faker.internet.password());
            await insertUser(username, password);
        }

        const users = await listUsers();

        for (const user of users) {
            const gender = faker.person.sex();
            const profile = {
                gender: gender,
                userId: user.id,
                name: faker.person.fullName({ sex: gender }),
                location: faker.location.city(),
                university: universityPool[genRandomNumber(universityPool.length)],
                interests: `${interestsPool[genRandomNumber(interestsPool.length)]}, ${interestsPool[genRandomNumber(interestsPool.length)]}, ${interestsPool[genRandomNumber(interestsPool.length)]}`,
            };
            await insertProfile(profile);
        }

        console.log('Dummy data inserted successfully');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        db.close();
    }
};

generateDummyData();

