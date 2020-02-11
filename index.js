var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3333;
//Lowdb
const low = require('lowdb');
const shortid = require('shortid')
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/',function(request,reponse) {
    reponse.render('index',{
        name: 'THONG'
    });
});

app.get('/users',function(request,reponse) {
    reponse.render('users/index',{
        users: db.get('users').value()
    });
});


app.get('/users/search',function(request,reponse) {
    var q = request.query.q;
    var matchedUsers = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    reponse.render('users/index',{
        users: matchedUsers
    });
});

//Form dang ki
app.get('/users/create',function(request,reponse) {
    reponse.render('users/create');
});

//Cài body-parser để đọc dữ liệu từ client để lên dưới dạng Object
// npm install body-parser --save
app.post('/users/create',function(req,res) {
    //Tao ra id đưa vào body
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect("/users");
});

app.listen(port,function(){
    console.log('Server is running at port '+port);
});

//Cài nodemon để k cần phải chạy lại server
//npm install --save-dev nodemon

//Cài database nhỏ nhỏ để demo thôi lowdb
//npm install lowdb


//View từng user
app.get('/users/:id',function(req,res) {
    var id = req.params.id;
    var user = db.get('users').find({id : id}).value();
    res.render('users/viewUser',{
        user: user
    });
});

//Sửa lại code 1 tí để tạo ra id bằng shortid lowdb