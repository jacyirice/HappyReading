var url = require('url');

module.exports = async(req, res, next) => {
    let queryObject = req.query;

    req.pagination = {};
    req.pagination.page = parseInt(queryObject.page) || 1;
    req.pagination.limit = parseInt(queryObject.limit) || 8;

    delete queryObject.page;
    delete queryObject.limit;

    // req.query_params = queryObject;

    next();
}