var express = require('express');
var router = express.Router();

const MeetingController = require("../../controllers/homeControllers/MeetingController");

router.get('/', MeetingController.index);
router.get('/:id', MeetingController.detail);
router.post('/:id/markPresence', MeetingController.markPresence);

module.exports = router;