var db = require('../db');
var md5 = require('md5');
module.exports.validateLogin = function(req,res, next){
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({email : email}).value();

    var errors = [];
    if(!req.body.email){
        errors.push('Email is required.');
    }

    if(!req.body.password){
        errors.push('Password is required.');
    }

    if(!user){
        errors.push("User does not exits");
    }

    var hashMd5 = md5(password);
    if(user.password !== hashMd5){
        errors.push("Wrong password");
    }

    if(errors.length){
        res.render('auth/login',{
            errors: errors,
            values: req.body
        });
        return;
    }
    console.log(user.id);
    res.cookie('userId',user.id);
    next();
}