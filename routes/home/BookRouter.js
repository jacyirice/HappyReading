var express = require('express');
var router = express.Router();

const ChaptersRouter = require("./ChapterRouter")
const BookController = require("../../controllers/homeControllers/BookController");

router.get('/', BookController.index);
router.get('/:id', BookController.detail);
router.post('/:id/like', BookController.like);
router.use('/', ChaptersRouter);

module.exports = router;