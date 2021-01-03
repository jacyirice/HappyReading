var express = require('express');
var router = express.Router();

const bookSchema = require("../validations/BookSchema")

const ValidaToken = require("../middlewares/ValidaToken");
const validaBody = require("../middlewares/ValidaBody");
const VerificaSeTemToken = require("../middlewares/VerificaSeTemToken");
const BookController = require("../constrollers/BookController");

router.get('/books', BookController.index);
router.get('/books/:id', BookController.detail);

module.exports = router;