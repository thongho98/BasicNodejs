var express = require("express");

var controller = require("../controllers/user.controller");
var validate = require("../validate/user.validate");
var middlewareAuth = require("../middlewares/auth.middleware");

var router = express.Router();

router.get("/",middlewareAuth.requiredAuth, controller.index);

//Cookie
router.get("/cookie", function(req, res, next) {
  //res.cookie("user-id", 123);
  res.send("Hello");
});

router.get("/search", controller.search);

//Form dang ki
router.get("/create", middlewareAuth.requiredAuth, controller.formCreateUser);

router.post("/create", validate.validateUser, controller.createUser);

//View từng user
router.get("/:id", controller.getUser);

//Lúc nào cũg export ra để xài
module.exports = router;
