var shortid = require('shortid');

var db = require('../db');

module.exports = function(req,res,next){
    if(!req.signedCookies.sessionId){
        var sesionId = shortid.generate();
        res.cookie('sessionId',sesionId,{
            signed: true
        });
        db.get('sessions').push({
            id: sesionId
        }).write();
    }
    
    next();
}