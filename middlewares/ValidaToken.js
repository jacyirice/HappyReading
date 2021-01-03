const config = require('../config/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async(req, res, next) => {

    try {
        const user = await User.findOne({
            where: {
                id: 1,
            }
        });
        req.user = user.dataValues;
        // let corpo = jwt.verify(req.token, config.tokenSecret);
        // req.user = corpo.user;
        next();
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Token inválido" });
        return;
    }

}