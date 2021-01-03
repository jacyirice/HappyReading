var express = require('express');
var router = express.Router();

const ChapterConstroller = require("../../constrollers/ChapterConstroller");

router.get('/:id/chapter/:id_chapter', ChapterConstroller.my_chapter);
router.post('/:id/chapter', ChapterConstroller.store_chapter);

module.exports = router;