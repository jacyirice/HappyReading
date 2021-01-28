const { Book, Chapter } = require('../../models');
const ChapterController = {

    detail: async(req, res) => {
        try {
            const chapter = await Chapter.findOne({
                include: [{
                    model: Book,
                    where: {
                        user_id: req.user.id
                    },
                    attributes: ['id', 'title']
                }],
                where: {
                    book_id: req.params.id_book,
                    id: req.params.id
                },
            })

            if (!chapter) {
                return res.status(404).json({
                    "title": "Livro não encontrado!",
                    "errors": ["Não foi possivel encontrar seu livro!"]
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

    store: async(req, res) => {
        req.body['book_id'] = req.params.id_book;
        try {
            const chapter = await Chapter.create(req.body)

            res.status(201).json({
                "title": "Capitulo criado com sucesso!",
                "object": chapter
            });
        } catch (errors) {
            if (errors.name == 'SequelizeValidationError') {
                res.status(400).json({
                    "title": "Criação falhou:(",
                    "errors": errors.errors.map(error => error.message)
                });
            } else {
                res.status(500).json({
                    "title": "Algo aconteceu:(",
                    "errors": ['Algo inexperado aconteceu!'],
                });
            }
        };
    },

    update: async(req, res) => {
        delete req.body.book_id
        try {
            const chapter = await Chapter.update(
                req.body, {
                    where: { id: req.params.id, book_id: req.params.id_book, user_id: req.user.id }
                })

            if (!chapter) {
                res.status(404).json({
                    "title": "Capitulo não encontrado!",
                    "errors": ["Não foi possivel encontrar seu Capitulo!"]
                });
            }

            res.status(201).json({
                "title": "Capitulo atualizado com sucesso!",
                "object": chapter
            });
        } catch (errors) {
            if (errors.name == 'SequelizeValidationError') {
                res.status(400).json({
                    "title": "Atualização falhou:(",
                    "errors": errors.errors.map(error => error.message)
                });
            } else {
                res.status(500).json({
                    "title": "Algo aconteceu:(",
                    "errors": ['Algo inexperado aconteceu!'],
                });
            }
        };
    },

    destroy: async(req, res) => {
        try {
            const chapter = await Chapter.destroy({
                where: {
                    user_id: req.user.id,
                    id: req.params.id,
                }
            });


            if (!chapter) {
                res.status(404).json({
                    "title": "Capitulo não encontrado!",
                    "errors": ["Não foi possivel encontrar seu Capitulo!"]
                });
            }

            res.status(200).json({
                "title": "Capitulo deletado com sucesso!",
                "object": null
            });

        } catch (errors) {
            if (errors.name == 'SequelizeValidationError') {
                res.status(400).json({
                    "title": "Deleção falhou:(",
                    "errors": errors.errors.map(error => error.message)
                });
            } else {
                res.status(500).json({
                    "title": "Algo aconteceu:(",
                    "errors": ['Algo inexperado aconteceu!'],
                });
            }
        };
    },
}
module.exports = ChapterController;