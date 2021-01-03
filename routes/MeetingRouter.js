var express = require('express');
var router = express.Router();

const ValidaToken = require("../middlewares/ValidaToken");
const VerificaSeTemToken = require("../middlewares/VerificaSeTemToken");
const MeetingController = require("../constrollers/MeetingController");
router.use(VerificaSeTemToken, ValidaToken);
router.get('/', MeetingController.index);
router.get('/:id', MeetingController.detail);
router.get('/:id/markPresence', MeetingController.markPresence);

module.exports = router;