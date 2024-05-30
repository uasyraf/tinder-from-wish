const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');

module.exports = {
    check: (req, res, next) => {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({
                status: false,
                error: { message: 'We did not receive any authorization headers from the request.' },
            });
        }

        if (!authHeader.startsWith('Bearer')) {
            return res.status(401).json({
                status: false,
                error: { message: 'Invalid authorization method.' },
            })
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: false,
                error: { message: 'Missing Bearer token in the authorization headers.' }
            })
        }

        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) {
                return res.status(403).json({
                    status: false,
                    error: { message: 'Invalid Bearer token provided, please login again.' }
                });
            }

            req.user = user;
            next();
        });
    }
}