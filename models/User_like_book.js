const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user_like_book', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'book',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }, {
        sequelize,
        tableName: 'user_like_book',
        timestamps: true,
        indexes: [{
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
            {
                name: "user_like_book_user_id_book_id_ca484f5a_uniq",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "user_id" },
                    { name: "book_id" },
                ]
            },
            {
                name: "user_like_book_book_id_b7144d4b_fk_book_id",
                using: "BTREE",
                fields: [
                    { name: "book_id" },
                ]
            },
        ]
    });
};