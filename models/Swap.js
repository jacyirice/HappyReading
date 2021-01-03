const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const swap = sequelize.define('swap', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        title_book: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'book',
                key: 'id'
            }
        },
        swap_book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'book',
                key: 'id'
            }
        },
        swap_with_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
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
        tableName: 'swap',
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
                name: "swap_id_swap_with_id_book_id_user_id_swap_book_id_e3b0d9e2_uniq",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                    { name: "swap_with_id" },
                    { name: "book_id" },
                    { name: "user_id" },
                    { name: "swap_book_id" },
                ]
            },
            {
                name: "swap_book_id_2aabeb73_fk_book_id",
                using: "BTREE",
                fields: [
                    { name: "book_id" },
                ]
            },
            {
                name: "swap_swap_book_id_99860d6e_fk_book_id",
                using: "BTREE",
                fields: [
                    { name: "swap_book_id" },
                ]
            },
            {
                name: "swap_swap_with_id_8ddbd91c_fk_user_id",
                using: "BTREE",
                fields: [
                    { name: "swap_with_id" },
                ]
            },
            {
                name: "swap_user_id_401888d4_fk_user_id",
                using: "BTREE",
                fields: [
                    { name: "user_id" },
                ]
            },
        ]
    });
    swap.associate = models => {
        swap.belongsTo(models.Swap_with, { as: 'swap_with', foreignKey: 'swap_with_id' });
        swap.belongsTo(models.Swap_book, { as: 'swap_book', foreignKey: 'swap_book_id' });
        swap.belongsTo(models.Book, { as: 'book', foreignKey: 'book_id' });
        swap.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    }

    return swap;
};