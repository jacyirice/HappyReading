const config = require('../config/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async(req, res, next) => {

    try {
        let corpo = jwt.verify(req.token, config.tokenSecret);
        req.user = corpo.user;
        next();
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Token inválido" });
        return;
    }

}