var express = require('express');
var router = express.Router();

const AuthController = require("../../controllers/authenticationControllers/AuthController");

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.get('/email/confirm', AuthController.confirm_email)

module.exports = router;