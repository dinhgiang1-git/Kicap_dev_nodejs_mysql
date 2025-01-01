const db = require('../common/connect');

var Keycap = function(keycap) {
    this.id = keycap.id;
    this.name = keycap.name;
    this.price = keycap.price;
    this.img = keycap.img;
    this.slug = keycap.slug;
    this.old_price = keycap.old_pirce;
    this.author_id = book.author_id;
}

Keycap.get_all = function(result) {
    db.query('SELECT * FROM keycap', function(err, keycap) {
        if (err) {
            result(null);
            return;
        }
        result(keycap);
    });
}

//4 Sản phẩm mới
Keycap.get_new = function (result) {
    const sql = 'SELECT * FROM keycap ORDER BY id DESC LIMIT 4';
    db.query(sql, function (err, keycap) {
        if (err) {
            console.error('Error executing query:', err);
            result(null); // Trả về null nếu có lỗi
            return;
        }
        result(keycap); // Trả về danh sách sản phẩm
    });
};

// Lấy chi tiết một keycap dựa trên id
Keycap.get_by_id = function (id, result) {
    const sql = 'SELECT * FROM keycap WHERE id = ?';
    db.query(sql, [id], function (err, keycap) {
        if (err) {
            console.error('Error fetching keycap by id:', err);
            result(null); // Trả về null nếu có lỗi
            return;
        }
        result(keycap[0]); // Trả về sản phẩm đầu tiên (vì WHERE chỉ trả về 1 dòng)
    });
};

Keycap.create = function(data, result) {       
    db.query('INSERT INTO keycap SET ?', data, function(err, keycap) {
        if (err) {
            result(null);
            return;
        }
        result({id: keycap.insertId, ...data});
    });
}

Keycap.remove = function(id, result) {
    db.query('DELETE FROM keycap WHERE id = ?', id, function(err, keycap) {
        if (err) {
            result(null);
            return;
        }
        result("Xóa dữ liệu book có id "+ id +" thành công");
    });
}

Keycap.update = function(b, result) {     
    db.query('UPDATE keycap SET name = ?, price = ?, img = ?, slug = ?, old_price = ? WHERE id = ?', [b.name, b.price, b.img, b.slug, b.old_price, b.id], function(err, keycap) {
        if (err) {
            result(null);
            return;
        }
        result(b);
    });
}

Keycap.getFiltered = function (sort, result) {
    let sql;
    switch (sort) {
        case 'A-Z':
            sql = 'SELECT * FROM keycap ORDER BY name ASC';
            break;
        case 'Z-A':
            sql = 'SELECT * FROM keycap ORDER BY name DESC';
            break;
        case 'new':
            sql = 'SELECT * FROM keycap ORDER BY id DESC';
            break;
        case 'asc':
            sql = 'SELECT * FROM keycap ORDER BY price ASC';
            break;
        case 'dsc':
            sql = 'SELECT * FROM keycap ORDER BY price DESC';
            break;
        default:
            sql = 'SELECT * FROM keycap';
    }

    db.query(sql, (err, keycaps) => {
        if (err) {
            result(err, null);
        } else {
            result(null, keycaps);
        }
    });
};

Keycap.searchByKeyword = function (keyword, result) {
    const sql = 'SELECT * FROM keycap WHERE name LIKE ?';
    const searchQuery = `%${keyword}%`;

    db.query(sql, [searchQuery], (err, keycaps) => {
        if (err) {
            result(err, null);
        } else {
            result(null, keycaps);
        }
    });
};



module.exports = Keycap;