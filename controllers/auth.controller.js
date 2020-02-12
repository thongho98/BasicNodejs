module.exports = {
    login : function(req,res) {
        res.render('auth/login');
    },
    postLogin: function(req,res){
        res.redirect("/users");
    }
}