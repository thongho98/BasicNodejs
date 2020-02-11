var shortid = require('shortid');

var db = require('../db');

module.exports.index = function(request,reponse) {
    reponse.render('users/index',{
        users: db.get('users').value()
    });
};

module.exports.search = function(request,reponse) {
    var q = request.query.q;
    var matchedUsers = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    reponse.render('users/index',{
        users: matchedUsers
    });
};

module.exports.formCreateUser = function(req,res) {
    res.render('users/create');
};

module.exports.createUser = function(req,res) {
    //Tao ra id đưa vào body
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect("/users");
};

module.exports.getUser = function(req,res) {
    var id = req.params.id;
    var user = db.get('users').find({id : id}).value();
    res.render('users/viewUser',{
        user: user
    });
};
