module.exports = (req, res, next) => {
    if (req.files) {
        re = /public/;
        req.body.image = req.files[0].path.replace(re, '');
    }
    next();
}