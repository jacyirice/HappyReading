const PasswordValidation = (password, confirm_password) => {
    let errors = [];
    if (password != confirm_password)
        errors.push("Confirme a senha corretamente!")

    let power = 0;
    if ((password.length >= 4) && (password.length <= 7)) {
        power += 10;
    } else if (password.length > 7) {
        power += 25;
    }
    if (password.match(/[a-z]+/)) {
        power += 10;
    }
    if (password.match(/[A-Z]+/)) {
        power += 20;
    }
    if (password.match(/d+/)) {
        power += 20;
    }
    if (password.match(/W+/)) {
        power += 25;
    }
    if (power < 75)
        errors.push("A força da sua senha deve ser maior que 75!")

    return errors;
}
module.exports = PasswordValidation;