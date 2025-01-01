var mysql = require('mysql');

var conn = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'keycap_dev'
});

conn.connect(function(err) {
    if (err) console.log('Ket noi that bai!');
});

module.exports = conn;