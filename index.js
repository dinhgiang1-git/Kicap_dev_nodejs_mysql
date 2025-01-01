const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const expressHandlebars = require('express-handlebars').create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'app/views/layouts'),
  partialsDir: [path.join(__dirname, 'app/views/partials')],
  extname: '.hbs',
  helpers: {
    formatCurrency: (value) => {
        return value.toLocaleString('vi-VN') + 'đ';
    }
  }
});

//Config Body-Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Cấu hình thư mục tĩnh
app.use(express.static(path.join(__dirname, 'public')));



//Router
const homeRouter = require('./app/routers/home.router');
const detailRouter = require('./app/routers/detail.router');
const listRouter = require('./app/routers/list.router');
const adminRouter = require('./app/routers/admin.router');

//Temple Engine
app.engine('.hbs', expressHandlebars.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'app/views'));

//Router Init
app.use('/', homeRouter);
app.use('/', listRouter);
app.use('/', detailRouter);
app.use('/', adminRouter);



app.listen(port, () => {
  console.log(`Demo app listening on port ${port}`);
});