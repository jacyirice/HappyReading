const SearchField = (query, field) => {
    let q = query.q;
    if (q) {
        query[field] = {
            [Op.ilike]: '%' + q + '%'
        };
        delete query.q;
    }
}

module.exports = SearchField;