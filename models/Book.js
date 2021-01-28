const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('book', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        summary: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        status: {
            type: DataTypes.SMALLINT,
            allowNull: false
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
        tableName: 'book',
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
                name: "book_id_user_id_640a2f6d_uniq",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                    { name: "user_id" },
                ]
            },
            {
                name: "book_user_id_fc20b5c3_fk_user_id",
                using: "BTREE",
                fields: [
                    { name: "user_id" },
                ]
            },
        ]
    });
};