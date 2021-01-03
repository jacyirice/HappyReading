// const UsuariosController = require('../constrollers/UsuariosController.js');
const HomeController = require('../constrollers/HomeController');
const express = require('express');
const router = express.Router();



router.get('/usuarios', HomeController.index);

module.exports = router;