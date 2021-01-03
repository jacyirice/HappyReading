var express = require('express');
var router = express.Router();

const MeetingController = require("../../constrollers/MeetingController");

router.get('/inscriptions', MeetingController.my_inscription);
router.get('/', MeetingController.my_index);
router.post('/', MeetingController.store);
router.get('/:id', MeetingController.my_detail);
// router.patch('myaccount/meetings/:id', MeetingController.update);
router.delete('/:id', MeetingController.destroy);
module.exports = router;