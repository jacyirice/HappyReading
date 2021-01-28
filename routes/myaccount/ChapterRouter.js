var express = require('express');
var router = express.Router();

const ChapterController = require("../../controllers/myaccountControllers/ChapterController");

router.post('/:id_book/chapters/', ChapterController.store)
router.get('/:id_book/chapters/:id/', ChapterController.detail);

module.exports = router;