const Keycap = require('../models/keycap.model');

// Lấy chi tiết sản phẩm theo id
exports.get_Page = (req, res) => {
        res.render('detail');
};

// Lấy chi tiết sản phẩm theo id
exports.getProductDetail = (req, res) => {
    const id = req.params.id; // Lấy id từ URL

    Keycap.get_by_id(id, function (keycaps) {
        if (!keycaps) {
            return res.status(404).send('Product not found'); 
        }

        keycaps.price = keycaps.price.toLocaleString('vi-VN') + 'đ'; // Ví 
        keycaps.old_price = keycaps.old_price.toLocaleString('vi-VN') + 'đ'; 

        // Render view với dữ liệu sản phẩm
        res.json(keycaps);
    });
};
