var MeetingRouter = require('./MeetingRoute');
var BookRouter = require('./BookRouter');
// let app = require("../../app").app;
var express = require('express');
var router = express.Router();

const VerificaSeTemToken = require("../../middlewares/VerificaSeTemToken");
const ValidaToken = require("../../middlewares/ValidaToken");

router.use(VerificaSeTemToken, ValidaToken);

router.use('/meetings', MeetingRouter);
router.use('/books', BookRouter);

module.exports = router;