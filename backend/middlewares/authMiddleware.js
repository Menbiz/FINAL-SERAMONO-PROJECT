// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken'); // Assuming you're using JWT for authentication

// Middleware to check if the user is an admin
const checkAdmin = (req, res, next) => {
    // Retrieve the token from the request headers (assuming Bearer token)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Assuming user role is part of the decoded token
        if (decoded.role === 'admin') {
            return next(); // User is an admin, proceed to the next middleware or route handler
        }

        // User is not an admin, respond with a forbidden error
        res.status(403).json({ error: 'Forbidden: Admins only' });

    } catch (error) {
        // Token verification failed
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = {
    checkAdmin
};
