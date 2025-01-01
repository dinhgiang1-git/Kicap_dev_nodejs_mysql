

thư viện các script: (bắt buộc): 

    "mysql": "^2.18.1",
    "nodemon": "^3.1.9"
    "body-parser": "^1.20.3",
    "express": "^4.21.2",
    "express-handlebars": "^8.0.1",
    "morgan": "^1.10.0",
    "node-fetch": "^3.3.2"


npm start chạy app
npm run watch để sửa scss (chạy nếu cần sửa css) chỉ sửa ở file scss


cấu hình file connect 
  var conn = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'keycap_dev'
});