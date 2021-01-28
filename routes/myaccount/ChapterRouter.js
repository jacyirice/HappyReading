var express = require('express');
var router = express.Router();

const ChapterController = require("../../controllers/myaccountControllers/ChapterController");

router.post('/:id_book/chapters/', ChapterController.store)
router.route('/:id_book/chapters/:id/')
    .get(ChapterController.detail)
    .put(ChapterController.update)
    .delete(ChapterController.destroy);

module.exports = router;