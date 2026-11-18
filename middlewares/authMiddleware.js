const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = {
    verifyAdminPage: (req, res, next) => {
        const token = req.cookies?.admin_token;
        if (!token) return res.redirect('/login');

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.admin = decoded;
            next();
        } catch (error) {
            res.clearCookie('admin_token');
            return res.redirect('/login');
        }
    },

    verifyAdminAPI: (req, res, next) => {
        const token = req.cookies?.admin_token;
        if (!token) {
            return res.status(401).json({ success: false, pesan: 'Akses ditolak. Silakan login sebagai admin.' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.admin = decoded;
            next();
        } catch (error) {
            return res.status(403).json({ success: false, pesan: 'Token JWT tidak valid atau kedaluwarsa.' });
        }
    }
};

module.exports = authMiddleware;