var MeetingRouter = require('./MeetingRoute');
var UserRouter = require('./UserRouter');
var express = require('express');
var router = express.Router();

router.use('/meetings', MeetingRouter);
router.use('/user', UserRouter);

module.exports = router;