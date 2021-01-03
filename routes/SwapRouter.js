var express = require('express');
var router = express.Router();

const ValidaToken = require("../middlewares/ValidaToken");
const VerificaSeTemToken = require("../middlewares/VerificaSeTemToken");
const swapController = require("../constrollers/swapController");

router.get('/ajax/:id', VerificaSeTemToken, ValidaToken, swapController.swapAjax);
// router.get('/:id/markPresence', swapController.markPresence);

module.exports = router;