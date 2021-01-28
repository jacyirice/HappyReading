const { Op } = require('sequelize');
const SearchField = (query, field) => {
    let q = query.q;
    if (q) {
        query[field] = {
            [Op.like]: '%' + q + '%'
        };
        delete query.q;
    }
}

module.exports = SearchField;