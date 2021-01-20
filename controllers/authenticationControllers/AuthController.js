const { User, Address } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const valid_password = require('../../validators/PasswordValidation');
const transporter = require('../../config/transport');
const { sequelize } = require('../../models')

const AuthController = {

    login: async(req, res) => {

        // Capturar as informações da requisição
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ error: "Usuário/Senha inválidos" });
        }

        // Carregar o usuário que seja dono do email enviado
        const user = await User.findOne({ where: { email: email } });

        // Tratando o caso de usuário inexistente
        if (!user || !user.active || !user.verified) {
            return res.status(401).json({ error: "Usuário/Senha inválidos" });
        }

        // Validar o usuário
        const loginOk = await bcrypt.compare(password, user.password);

        // Tratando o caso da validação da password falhar
        if (!loginOk) {
            return res.status(401).json({ error: "Usuário/Senha inválidos" });
        }

        // Arrancando a password do obj user
        user.password = undefined;

        // Gerar o token (jwt - biblioteca: jsonwebtoken)
        const token = jwt.sign({ user }, config.tokenSecret);

        // Enviar o token
        return res.json({ user, token });

    },

    register: async(req, res) => {
        body_address = req.body.address;
        body_user = req.body.user;
        if (await User.findOne({ where: { email: body_user.email } }))
            return res.status(400).json({
                "title": "Criação falhou:(",
                "errors": ["Esse email não está disponivel!"]
            });
        try {
            const result = await sequelize.transaction(async(t) => {
                const address = await Address.create(body_address)
                let errors = valid_password(body_user.password, body_user.confirm_password)
                if (errors)
                    return res.status(400).json({
                        "title": "Criação falhou:(",
                        "errors": errors
                    });

                body_user.password = await bcrypt.hashSync(body_user.password, 10);
                body_user.address_id = address.toJSON().id;
                // body_user.active = true;
                // body_user.verified = false;

                const user = await User.create(body_user);
                const token = jwt.sign({ email: user.email }, config.secretEmailConfirm);
                const url_confirmation = 'http://localhost:3000/authentication/email/confirm?token=' + token
                const mailOptions = {
                    from: 'olamundo132@gmail.com',
                    to: user.email,
                    subject: 'Confirme seu email!',
                    html: '<h1>Confirme seu email!</h1>' +
                        '<p>Clique no botão abaixo e confirme seu email para poder logar com sua conta!</p>' +
                        '<a type="botton" href=' + url_confirmation + '>Confirmar email</a>'
                };
                transporter.sendMail(mailOptions);
                res.status(201).json({
                    "title": "Confirme seu email!",
                    "message": "Confirme seu email para poder logar com sua conta!",
                });

            });
        } catch (errors) {
            if (errors.name == 'SequelizeValidationError') {
                res.status(400).json({
                    "title": "Criação falhou:(",
                    "errors": errors.errors.map(error => error.message)
                });
            } else {
                console.log(errors);
                res.status(500).json({
                    "title": "Algo aconteceu:(",
                    "errors": ['Algo inexperado aconteceu!'],
                });
            }
        };
    },

    confirm_email: async(req, res) => {
        if (!req.query.token)
            return res.status(400).json({
                "title": "Confirmação falhou:(",
                "errors": ["Token não enviado!"]
            });
        try {
            let body = jwt.verify(req.query.token, config.secretEmailConfirm);
            if (!body.email || body.id)
                return res.status(400).json({
                    "title": "Confirmação falhou:(",
                    "errors": ["Token expirado ou invalido!"]
                });

            const user = await User.update({ verified: 1 }, {
                where: { email: body.email, active: true, verified: false }
            });
            if (!user[0])
                return res.status(400).json({
                    "title": "Confirmação falhou:(",
                    "errors": ["Token inexistente ou invalido!"]
                });

            res.status(200).json({
                "title": "Email confirmado com sucesso!",
                "object": null
            });
        } catch (errors) {
            console.log(errors)
            res.status(400).json({
                "title": "Confirmação falhou:(",
                "errors": ["Token inexistente ou invalido!"]
            });
        }
    }
}

module.exports = AuthController;