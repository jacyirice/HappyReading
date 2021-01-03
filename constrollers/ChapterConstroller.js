const { Book, Chapter } = require('../models');
const ChapterController = {

    my_chapter: async(req, res) => {
        const chapter = await Chapter.findOne({
            include: [{
                model: Book,
                where: {
                    id: req.params.id
                }
            }],
            where: {
                user_id: req.user.id,
                id: req.params.id_chapter
            },
        });
        return res.json(chapter)
    },
    store_chapter: async(req, res) => {
        req.body['book_id'] = req.params.id;
        const chapter = await Chapter.create(req.body);
        return res.json(chapter)
    },
}
module.exports = ChapterController;