var express = require('express');
var router = express.Router();

const bookSchema = require("../../validations/BookSchema")

const validaBody = require("../../middlewares/ValidaBody");
const BookController = require("../../constrollers/BookController");
const ChapterRouter = require("./ChapterRouter");

router.get('/', BookController.my_index);
router.post('/', validaBody(bookSchema), BookController.store);
router.get('/:id', BookController.my_detail);
router.patch('/:id', BookController.update);
router.delete('/:id', BookController.destroy);

router.use('/:id/chapter', ChapterRouter);

module.exports = router;