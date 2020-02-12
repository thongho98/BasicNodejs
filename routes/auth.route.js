var express = require('express');

var controller = require('../controllers/auth.controller');
var validate = require('../validate/auth.validate');

var router = express.Router();

router.get('/login', controller.login);

router.post('/login',validate.validateLogin,controller.postLogin);

module.exports = router;