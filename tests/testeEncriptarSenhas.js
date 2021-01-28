const { sequelize, User } = require('../models');
const bcrypt = require('bcrypt');

User.findAll().then(
    usuarios => {
        let promesses = [];
        usuarios.forEach(
            (usuario) => {
                promesses.push(
                    usuario.update({ senha: bcrypt.hashSync(usuario.password, 10) })
                )
            }
        )
        Promise.all(promesses).then(
            () => {
                console.log('ok');
                sequelize.close();
            }
        )
    }
)