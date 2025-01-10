const Keycap = require('../models/keycap.model');

exports.show = (req, res) => { 
    res.render('admin/admin', {
       layout: 'admin',
       title: 'Quản lý sản phẩm'  
    });
}

exports.getAll = (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 5; 

    Keycap.get_all_paginated(page, limit, function (result) {
        if (!result) {
            return res.status(500).send('Error fetching!');
        }
        res.json(result);
    });
};

exports.add_Keycap = (req, res) => {
    var data = req.body;
    Keycap.create(data, function(response) {
        res.send({result: response});
    });
}

exports.delete_keycap = (req, res) => {
    var id = req.params.id;
    Keycap.remove(id, function(response) {
        res.send({result: response})
    });
}

exports.update_keycap = (req, res) => {
    var data = req.body;
    Keycap.update(data, function(response) {
        res.send({result: response});
    });
}