const { User, Book, Chapter, User_like_book } = require('../../models');
const { Sequelize, Op } = require('sequelize');
const BookController = {

    like: async(req, res) => {
        try {
            const book = await Book.findOne({
                attributes: ['id'],
                where: {
                    id: req.params.id
                },
            })
            if (!book) {
                return res.status(404).json({
                    "title": "Encontro não encontrado!",
                    "errors": ["Não foi possivel encontrar seu Encontro!"]
                })
            }

            const inscription = await User_like_book.findOrCreate({
                where: {
                    book_id: req.params.id,
                    user_id: req.user.id,
                }
            })
            if (inscription[1]) {
                return res.status(201).json({
                    "title": "Curtido com sucesso!",
                    "object": null
                });
            } else {
                return res.status(400).json({
                    "title": "Opa! Calma lá",
                    "errors": ["Vc já curtiu esse livro!"],
                })
            }
        } catch (errors) {
            if (errors.name == 'SequelizeValidationError') {
                res.status(400).json({
                    "title": "Criação falhou:(",
                    "errors": errors,
                });
            } else {
                console.log(errors)
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
        let q = req.query.q;
        if (q) {
            req.query.title = {
                [Op.like]: '%' + q + '%'
            };
            delete req.query.q;
            console.log(req.query)
        }

        try {
            const books = await Book.findAll({
                include: [{ model: User, attributes: ['first_name', 'last_name', 'email'] }],
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
                    { model: User, attributes: ['first_name', 'last_name', 'email'] },
                    { model: Chapter, attributes: ['id', 'title'] }
                ],
                where: {
                    id: req.params.id,
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
    }
}

module.exports = BookController;