module.exports = (req, res, next) => {
    req.query.user_id = req.user.id;
    next();
}