const { Book, Chapter, User_like_book } = require('../../models');
const { Sequelize, ValidationError } = require('sequelize')
const searchField = require('../../utils/QueryEdit/SearchField')
const BookController = {

    liked: async(req, res) => {
        let limit = req.pagination.limit;
        let page = req.pagination.page;
        try {
            const books = await Book.findAll({
                include: [{
                    model: User_like_book,
                    where: {
                        user_id: req.user.id
                    },
                    attributes: []
                }],
                order: [
                    ['updatedAt', 'DESC']
                ],
                offset: 0 + (page - 1) * limit,
                limit: limit,
            });

            res.status(200).json({
                "items": books,
                "page": page,
                "limit": limit
            });
        } catch (errors) {
            console.log(errors)
            res.status(500).json({
                "title": "Algo aconteceu:(",
                "errors": ['Algo inexperado aconteceu!'],
            });
        };
    },

    unliked: async(req, res) => {
        try {
            const book = await User_like_book.destroy({
                where: {
                    user_id: req.user.id,
                    id: req.params.id,
                }
            })


            if (!book) {
                return res.status(404).json({
                    "title": "Você não curtiu esse livro!",
                    "errors": ["Você não curtiu esse livro!"]
                });
            }

            res.status(200).json({
                "title": "Você descurtiu esse livro!",
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

    index: async(req, res) => {
        let limit = req.pagination.limit;
        let page = req.pagination.page;
        searchField(req.query, 'title');
        try {
            const books = await Book.findAll({
                where: req.query,
                order: [
                    ['updatedAt', 'DESC']
                ],
                offset: 0 + (page - 1) * limit,
                limit: limit,
            });

            res.status(200).json({
                "items": books,
                "page": page,
                "limit": limit
            });
        } catch (errors) {
            console.log(errors)
            res.status(500).json({
                "title": "Algo aconteceu:(",
                "errors": ['Algo inexperado aconteceu!'],
            });
        };
    },

    detail: async(req, res) => {
        try {
            const book = await Book.findOne({
                attributes: ["id", "title", "summary", "image", "status", "createdAt", "updatedAt", [Sequelize.fn("COUNT", Sequelize.col("user_like_books.id")), "likes"]],
                include: [
                    { model: User_like_book, attributes: [] },
                    { model: Chapter, attributes: ['id', 'title'] }
                ],
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                }
            });

            if (!book.id) {
                return res.status(404).json({
                    "title": "Livro não encontrado!",
                    "errors": ["Não foi possivel encontrar seu livro!"]
                });
            };

            res.status(200).json(book);
        } catch (errors) {
            console.log(errors)
            res.status(500).json({
                "title": "Algo aconteceu:(",
                "errors": ['Algo inexperado aconteceu!'],
            });
        };
    },

    store: async(req, res) => {
        req.body.user_id = req.user.id
        try {
            const book = await Book.create(req.body)

            res.status(201).json({
                "title": "Livro criado com sucesso!",
                "object": book
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
        delete req.body.user_id
        try {
            const book = await Book.update(
                req.body, {
                    where: { id: req.params.id, user_id: req.user.id }
                })

            if (!book) {
                res.status(404).json({
                    "title": "Livro não encontrado!",
                    "errors": ["Não foi possivel encontrar seu livro!"]
                });
            }

            res.status(201).json({
                "title": "Livro atualizado com sucesso!",
                "object": book
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
            const book = await Book.destroy({
                where: {
                    user_id: req.user.id,
                    id: req.params.id,
                }
            })


            if (!book) {
                res.status(404).json({
                    "title": "Livro não encontrado!",
                    "errors": ["Não foi possivel encontrar seu livro!"]
                });
            }

            res.status(200).json({
                "title": "Livro deletado com sucesso!",
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

module.exports = BookController;