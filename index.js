//Thu viện ở ngoài
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//Thư viện tự tạo
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');

var app = express();
var port = 3333;

app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('abbbffffffffffffffffc'));
app.use(express.static('public'));

app.get('/',function(request,reponse) {
    reponse.render('index',{
        name: 'THONG'
    });
});

app.use('/users',userRoute);
app.use('/auth',authRoute);

app.listen(port,function(){
    console.log('Server is running at port '+port);
});

//Cài nodemon để k cần phải chạy lại server
//npm install --save-dev nodemon

//Cài database nhỏ nhỏ để demo thôi lowdb
//npm install lowdb

//Sửa lại code 1 tí để tạo ra id bằng shortid lowdb