require('dotenv').config();

module.exports = {
    operatorsAliases: "0",
    tokenSecret: process.env.TOKENSECRET,
    secretEmailConfirm: process.env.SECRETEMAILCONFIRM,
}