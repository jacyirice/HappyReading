var express = require('express');
var router = express.Router();

const MeetingRouter = require("./MeetingRouter")
const BookRouter = require("./BookRouter")
const HomeController = require('../../controllers/homeControllers/IndexController');

router.get('/', HomeController.index);
router.use('/books', BookRouter);
router.use('/meetings', MeetingRouter);

module.exports = router;