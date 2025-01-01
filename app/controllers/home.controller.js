// home.controller.js
const Keycap = require('../models/keycap.model');

exports.Keycap_page = (req, res) => {
    res.render('home');
};

exports.Keycap_new = (req, res) => {
    Keycap.get_new(function (keycaps) {
        if (!keycaps) {
            return res.status(500).json({ error: 'Error fetching keycaps' });
        }

        // Format price like 700.000đ
        keycaps = keycaps.map(keycap => ({
            ...keycap,
            price: keycap.price.toLocaleString('vi-VN') + 'đ',
            old_price: keycap.old_price ? keycap.old_price.toLocaleString('vi-VN') + 'đ' : null
        }));

        // Return JSON response
        res.json(keycaps);
    });
};