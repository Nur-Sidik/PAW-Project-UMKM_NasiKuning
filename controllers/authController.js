const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminModel = require('../models/adminModel');

const JWT_SECRET = process.env.JWT_SECRET;

const authController = {
    renderLogin: (req, res) => {
        const token = req.cookies?.admin_token;
        if (token) {
            try {
                jwt.verify(token, JWT_SECRET);
                return res.redirect('/admin');
            } catch (err) {
                res.clearCookie('admin_token');
            }
        }

        res.render('login', {
            appName: 'UMKM Nasi Kuning',
            error: null,
            success: req.query.registered ? 'Akun berhasil dibuat! Silakan login.' : null
        });
    },

    renderRegister: (req, res) => {
        res.render('register', {
            appName: 'UMKM Nasi Kuning',
            error: null
        });
    },

    registerProcess: async (req, res) => {
        try {
            const { nama_lengkap, username, password, confirm_password } = req.body;

            if (!nama_lengkap || !username || !password) {
                return res.status(400).render('register', { appName: 'UMKM Nasi Kuning', error: 'Semua kolom wajib diisi!' });
            }
            if (password !== confirm_password) {
                return res.status(400).render('register', { appName: 'UMKM Nasi Kuning', error: 'Konfirmasi password tidak cocok!' });
            }

            const existingAdmin = await AdminModel.findByUsername(username.trim());
            if (existingAdmin) {
                return res.status(400).render('register', { appName: 'UMKM Nasi Kuning', error: 'Username sudah terdaftar!' });
            }

            const hashedPassword = await bcrypt.hash(password, 5);
            await AdminModel.createAdmin(nama_lengkap.trim(), username.trim(), hashedPassword);

            return res.redirect('/login?registered=true');
        } catch (error) {
            console.error('[Register Error]:', error.message);
            return res.status(500).render('register', { appName: 'UMKM Nasi Kuning', error: 'Gagal mendaftarkan akun.' });
        }
    },

    loginProcess: async (req, res) => {
        try {
            const { username, password } = req.body;

            const admin = await AdminModel.findByUsername(username);
            if (!admin) {
                return res.status(401).render('login', { appName: 'UMKM Nasi Kuning', error: 'Username atau password salah!', success: null });
            }

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(401).render('login', { appName: 'UMKM Nasi Kuning', error: 'Username atau password salah!', success: null });
            }

            const payload = { id: admin.id, username: admin.username, nama: admin.nama_lengkap };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

            res.cookie('admin_token', token, { httpOnly: true, maxAge: 8 * 60 * 60 * 1000 });
            return res.redirect('/admin');
        } catch (error) {
            console.error('[Login Error]:', error.message);
            return res.status(500).render('login', { appName: 'UMKM Nasi Kuning', error: 'Kesalahan server database.', success: null });
        }
    },

    logout: (req, res) => {
        res.clearCookie('admin_token');
        return res.redirect('/login');
    }
};

module.exports = authController;