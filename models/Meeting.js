const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('meeting', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        objective: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        summary: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        location: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        datetime_start: {
            type: DataTypes.DATE(6),
            allowNull: false
        },
        datetime_finish: {
            type: DataTypes.DATE(6),
            allowNull: false
        },
        book: {
            type: DataTypes.STRING(255),
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
        tableName: 'meeting',
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
                name: "meeting_id_datetime_start_user_id_f3a056d1_uniq",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                    { name: "datetime_start" },
                    { name: "user_id" },
                ]
            },
            {
                name: "meeting_user_id_6b849b5a_fk_user_id",
                using: "BTREE",
                fields: [
                    { name: "user_id" },
                ]
            },
        ]
    });
};