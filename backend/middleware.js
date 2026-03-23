const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1]; // 0-Bearer 1-<token>

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.userId) {
            req.userId = decoded.userId;
        }
        next(); // calls the next func in order after middleware
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = { authMiddleware };
