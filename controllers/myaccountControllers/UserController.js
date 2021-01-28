const { User } = require('../../models');
const valid_password = require('../../utils/validators/PasswordValidation');
const bcrypt = require('bcrypt');

module.exports = {
    detail: async(req, res) => {
        const user = await User.findOne({ where: { id: req.user.id, active: true } });
        user.password = undefined;
        return res.json(user);
    },

    update: async(req, res) => {
        delete req.body.user_id;
        delete req.body.email;
        delete req.body.password;
        try {
            const user = await User.update(
                req.body, {
                    where: { id: req.user.id, active: true }
                });

            if (!user) {
                return res.status(404).json({
                    "title": "Usuario não encontrado!",
                    "errors": ["Não foi possivel encontrar seu usuario!"]
                });
            }

            res.status(201).json({
                "title": "Informações atualizadas com sucesso!",
                "object": null
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

    update_password: async(req, res) => {
        try {
            const user = await User.findOne({ where: { id: req.user.id, active: true } })

            if (!user) {
                return res.status(404).json({
                    "title": "Usuario não encontrado!",
                    "errors": ["Não foi possivel encontrar seu usuario!"]
                });
            }

            let errors = valid_password(req.body.new_password, req.body.confirm_password);

            if (!req.body.password)
                errors.push("Digite a senha atual corretamente!")
            else if (!await bcrypt.compare(req.body.password, user.password))
                errors.push("Digite a senha atual corretamente!")
            else if (await bcrypt.compare(req.body.new_password, user.password))
                errors.push("A nova senha deve ser diferente da atual!")
            if (errors.length)
                return res.status(400).json({
                    "title": "Atualização falhou:(",
                    "errors": errors
                });

            const new_password = await bcrypt.hashSync(req.body.new_password, 10);
            const Attuser = await user.update({ "password": new_password })

            res.status(201).json({
                "title": "Informações atualizadas com sucesso!",
                "object": user
            });
        } catch (errors) {
            if (errors.name == 'SequelizeValidationError') {
                res.status(400).json({
                    "title": "Atualização falhou:(",
                    "errors": errors.errors.map(error => error.message)
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

}