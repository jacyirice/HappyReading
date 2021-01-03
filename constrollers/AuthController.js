const { user } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { use } = require('../routes/IndexRouter');
const AuthController = {

    login: async(req, res) => {

        // Capturar as informações da requisição
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ error: "Usuário/Senha inválidos" });
        }

        // Carregar o usuário que seja dono do email enviado
        const user_object = await user.findOne({ where: { email } });

        // Tratando o caso de usuário inexistente
        if (!user_object) {
            return res.status(401).json({ error: "Usuário/Senha inválidos" });
        }

        // Validar o usuário
        const loginOk = await bcrypt.compare(password, user_object.password);
        // console.log(bcrypt.hashSync('1234', 2))
        // Tratando o caso da validação da password falhar
        // console.log(loginOk)
        if (loginOk) {
            return res.status(401).json({ error: "Usuário/Senha inválidos" });
        }

        // Arrancando a password do obj user_object
        user_object.password = undefined;

        // Gerar o token (jwt - biblioteca: jsonwebtoken)
        const token = jwt.sign({ user_object }, config.tokenSecret);

        // Enviar o token
        return res.json({ user_object, token });

    },

    showLogin: (req, res) => {
        res.render('auth/login');
    },

    showRegistro: (req, res) => {
        res.render('auth/register');
    },

    showHome: async(req, res) => {
        let meetings = await meeting.findAll({ include: ['address_meeting', 'user_has_meeting'] });
        let books = await book.findAll();
        return res.json({ "meetings": meetings, "books": books });
        let posts = await Post.findAll({ include: ['user', 'comentarios', 'curtiram'] });
        console.log(posts[0].toJSON());

        // Enviar estes posts para a view index
        res.render('index', { posts });
        res.render('index');
    }


}

module.exports = AuthController;