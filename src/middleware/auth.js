import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            code: 401,
            message: 'Authentication token required'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.user_id };
        req.session = { id: decoded.session_id };
        next();
    } catch (err) {
        return res.status(403).json({
            code: 403,
            message: 'Invalid or expired token'
        });
    }
};