var MeetingRouter = require('./MeetingRoute');
var BookRouter = require('./BookRouter');
var UserRouter = require('./UserRouter');
var express = require('express');
var router = express.Router();

const SetUserIdQuery = require("../../middlewares/SetUserIdQuery");

router.use('/meetings', MeetingRouter);
router.use('/books', SetUserIdQuery, BookRouter);
router.use('/user', UserRouter);

module.exports = router;