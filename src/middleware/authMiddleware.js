const jwt   = require('jsonwebtoken');
const user = require('../models/user');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await user.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ error: "Not authorized, Invalid Token" });
        }
    } else {
        res.status(401).json({ error: "Not Authorized, Get a Token" });
    }
};

module.exports = {protect};