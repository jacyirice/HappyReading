var express = require('express');
var router = express.Router();
var multer = require("multer")
var path = require("path")

const SetfieldImage = require('../../middlewares/SetfieldImage')
const BookController = require("../../controllers/myaccountControllers/BookController");
const ChapterRouter = require("./ChapterRouter");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/books')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage,
    limits: {
        files: 1,
        fileSize: 4 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return cb(new Error('Only images are allowed'))
        }
        cb(null, true)
    },
});

router.route('/')
    .get(BookController.index)
    .post(upload.any(), SetfieldImage, BookController.store);

router.get('/likeds', BookController.liked);
router.delete('/likeds/:id', BookController.unliked);

router.route('/:id')
    .get(BookController.detail)
    .put(upload.any(), SetfieldImage, BookController.update)
    .delete(BookController.destroy);

router.use('/', ChapterRouter);

module.exports = router;