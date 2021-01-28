var express = require('express');
var router = express.Router();

const ChapterController = require("../../controllers/homeControllers/ChapterController");

router.get('/:id_book/chapters/:id/', ChapterController.detail);

module.exports = router;