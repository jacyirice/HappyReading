var MeetingRouter = require('./MeetingRoute');
var BookRouter = require('./BookRouter');
var UserRouter = require('./UserRouter');
var express = require('express');
var router = express.Router();

router.use('/meetings', MeetingRouter);
router.use('/books', BookRouter);
router.use('/user', UserRouter);

module.exports = router;