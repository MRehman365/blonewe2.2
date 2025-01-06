const jwt = require('jsonwebtoken');

const createToken = (data) => {
    // Make sure to use the JWT_SECRET from environment variables
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

module.exports = { createToken };