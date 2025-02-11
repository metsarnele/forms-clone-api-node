import crypto from 'crypto';

// In-memory token storage (replace with database in production)
const tokenStore = new Map();

// Generate a secure random token
const generateToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Verify token middleware
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const userId = tokenStore.get(token);

    if (!userId) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Add user info to request object
    req.user = { id: userId, token };
    next();
};

// Session management functions
export const sessions = {
    create: (userId) => {
        const token = generateToken();
        tokenStore.set(token, userId);
        return { token, userId };
    },

    verify: (token) => {
        return tokenStore.get(token);
    },

    remove: (token) => {
        return tokenStore.delete(token);
    }
};