import crypto from 'crypto';
import { sessionDb } from '../db/db.js';

// Generate a secure random token
const generateToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Verify token middleware (this is your 'authenticateToken' logic)
export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const session = await sessionDb.verifySession(token);

        if (!session) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        // Add user info to request object
        req.user = {
            id: session.user_id,
            email: session.email,
            name: session.name,
            token
        };
        next();
    } catch (error) {
        console.error('Session verification error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Session management functions
export const sessions = {
    create: async (userId) => {
        const token = generateToken();
        await sessionDb.createSession(userId, token);
        return { token, userId };
    },

    verify: async (token) => {
        const session = await sessionDb.verifySession(token);
        return session ? session.user_id : null;
    },

    remove: async (token) => {
        await sessionDb.deleteSession(token);
    }
};
