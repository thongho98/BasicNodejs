var shortid = require('shortid');

var db = require('../db');

module.exports = {
    index : function(request,reponse) {
        reponse.render('users/index',{
            users: db.get('users').value()
        });
    },
    search : function(request,reponse) {
        var q = request.query.q;
        var matchedUsers = db.get('users').value().filter(function(user){
            return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
    
        reponse.render('users/index',{
            users: matchedUsers
        });
    },
    formCreateUser : function(req,res) {
        res.render('users/create');
    },
    createUser : function(req,res) {
        //Tao ra id đưa vào body
        var errors = [];
        req.body.id = shortid.generate();
        if(!req.body.name){
            errors.push('Name is required.');
        }
        if(!req.body.phone){
            errors.push('Phone is required.');
        }
        if(errors.length){
            res.render('users/create',{
                errors: errors,
                values: req.body
            });
            return;
        }
        db.get('users').push(req.body).write();
        res.redirect("/users");
    },
    getUser : function(req,res) {
        var id = req.params.id;
        var user = db.get('users').find({id : id}).value();
        res.render('users/viewUser',{
            user: user
        });
    }
}
