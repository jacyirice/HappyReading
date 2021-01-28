var nodemailer = require("nodemailer");
require('dotenv').config();

var mailConfig = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    },
    secure: true,
};
const transporter = nodemailer.createTransport(mailConfig);

module.exports = transporter;