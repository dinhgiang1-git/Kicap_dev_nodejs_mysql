const Keycap = require('../models/keycap.model');

//Render HTML
exports.KC_List_Page = (req, res) => {
        res.render('list');
}

//Render JSON
// Trả về JSON
exports.KC_List = (req, res) => {
    Keycap.get_all(function (keycaps) {
        if (!keycaps) {
            return res.status(500).json({ error: 'Error Fetching Keycaps!' });
        }
        keycaps = keycaps.map(keycap => ({
            ...keycap,
            price: keycap.price.toLocaleString('vi-VN') + 'đ',
            old_price: keycap.old_price ? keycap.old_price.toLocaleString('vi-VN') + 'đ' : null
        }));
        res.json(keycaps);
    });
};


/// Hàm lọc sản phẩm
exports.getFiltered = (req, res) => {
    const sort = req.query.sort;
    Keycap.getFiltered(sort, (err, keycaps) => {
        if (err) {
            res.status(500).json({ error: 'Error Filtering Keycaps!' });
        } else {
            // Format giá trước khi trả về
            keycaps = keycaps.map(keycap => ({
                ...keycap,
                price: keycap.price.toLocaleString('vi-VN') + 'đ',
                old_price: keycap.old_price ? keycap.old_price.toLocaleString('vi-VN') + 'đ' : null
            }));

            res.json(keycaps);
        }
    });
};

 // Nếu từ khóa rỗng, trả về toàn bộ sản phẩm
exports.searchKeycaps = (req, res) => {
    const keyword = req.query.search?.trim(); // Đảm bảo xử lý chuỗi rỗng

    if (!keyword) {
        Keycap.get_all((keycaps) => {
            if (!keycaps) {
                return res.status(500).json({ error: 'Error Fetching Keycaps!' });
            }

            keycaps = keycaps.map(keycap => ({
                ...keycap,
                price: keycap.price.toLocaleString('vi-VN') + 'đ',
                old_price: keycap.old_price ? keycap.old_price.toLocaleString('vi-VN') + 'đ' : null
            }));

            return res.json(keycaps); // Trả về toàn bộ sản phẩm
        });
        return;
    }

    // Nếu có từ khóa, thực hiện tìm kiếm
    Keycap.searchByKeyword(keyword, (err, keycaps) => {
        if (err) {
            return res.status(500).json({ error: 'Error searching keycaps!' });
        }

        keycaps = keycaps.map(keycap => ({
            ...keycap,
            price: keycap.price.toLocaleString('vi-VN') + 'đ',
            old_price: keycap.old_price ? keycap.old_price.toLocaleString('vi-VN') + 'đ' : null
        }));

        res.json(keycaps); // Trả về danh sách sản phẩm tìm được
    });
};




