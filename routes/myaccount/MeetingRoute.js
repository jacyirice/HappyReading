var express = require('express');
var router = express.Router();

const MeetingController = require("../../controllers/myaccountControllers/MeetingController");

router.get('/inscriptions', MeetingController.inscription);
router.delete('/inscriptions/:id', MeetingController.uninscription);

router.route('/')
    .get(MeetingController.index)
    .post(MeetingController.store);

router.route('/:id')
    .get(MeetingController.detail)
    .put(MeetingController.update)
    .delete(MeetingController.destroy);


module.exports = router;