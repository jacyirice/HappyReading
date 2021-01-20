var express = require('express');
var router = express.Router();

const MyAccountRouter = require('./myaccount/IndexRouter');
const AuthenticationRouter = require('./authentication/AuthRouter');

const VerificaSeTemToken = require('../middlewares/VerificaSeTemToken');
const ValidaToken = require('../middlewares/ValidaToken');

const Pagination = require("../middlewares/Pagination");

router.use('/authentication', AuthenticationRouter);
router.use('/myaccount', Pagination, VerificaSeTemToken, ValidaToken, MyAccountRouter);

module.exports = router;