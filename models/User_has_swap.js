const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const user_has_swap = sequelize.define('user_has_swap', {
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
        swap_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'swap',
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
        tableName: 'user_has_swap',
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
                name: "user_has_swap_user_id_swap_id_book_id_a13db444_uniq",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "user_id" },
                    { name: "swap_id" },
                    { name: "book_id" },
                ]
            },
            {
                name: "user_has_swap_book_id_d4f4d0b9_fk_book_id",
                using: "BTREE",
                fields: [
                    { name: "book_id" },
                ]
            },
            {
                name: "user_has_swap_swap_id_bd8f2667_fk_swap_id",
                using: "BTREE",
                fields: [
                    { name: "swap_id" },
                ]
            },
        ]
    });
    return user_has_swap;
};