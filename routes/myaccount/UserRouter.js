var express = require('express');
var router = express.Router();
var multer = require("multer")
var path = require("path")

const SetfieldImage = require('../../middlewares/SetfieldImage')
const UserController = require("../../controllers/myaccountControllers/UserController");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/users')
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

router.put('/password', UserController.update_password)
router.route('/')
    .get(UserController.detail)
    .put(upload.any(), SetfieldImage, UserController.update);


module.exports = router;