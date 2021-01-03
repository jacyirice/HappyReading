var express = require('express');
var router = express.Router();

const ValidaToken = require("../middlewares/ValidaToken");
const VerificaSeTemToken = require("../middlewares/VerificaSeTemToken");
// const AuthController = require("../constrollers/AuthController");
const HomeController = require('../constrollers/HomeController');

// router.post('/login', AuthController.login);
// router.get('/registro', AuthController.showRegistro);
router.get('/home', HomeController.index);

module.exports = router;