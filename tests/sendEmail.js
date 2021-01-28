const transporter = require('../config/transport')
const mailOptions = {
    from: 'olamundo132@gmail.com',
    to: 'jacyirice@gmail.com',
    subject: 'Confirme seu email!',
    html: '<h1>Confirme seu email!</h1>' +
        '<p>Clique no botão abaixo e confirme seu email para poder logar com sua conta!</p>' +
        '<a type="botton" href=></a>'
};
transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        //Success
    }
});