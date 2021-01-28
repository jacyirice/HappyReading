const { Book, Chapter } = require('../../models');

const ChapterController = {

    detail: async(req, res) => {
        try {
            const chapter = await Chapter.findOne({
                include: [{
                    model: Book,
                    attributes: ['id', 'title']
                }],
                where: {
                    book_id: req.params.id_book,
                    id: req.params.id
                },
            })

            if (!chapter) {
                return res.status(404).json({
                    "title": "Capitulo não encontrado!",
                    "errors": ["Não foi possivel encontrar seu Capitulo!"]
                });
            };

            res.status(200).json(chapter);

        } catch (errors) {
            console.log(errors)
            res.status(500).json({
                "title": "Algo aconteceu:(",
                "errors": ['Algo inexperado aconteceu!'],
            });
        };
    },
}
module.exports = ChapterController;