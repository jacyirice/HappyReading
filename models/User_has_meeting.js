const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const user_has_meeting = sequelize.define('user_has_meeting', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        meeting_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'meeting',
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
        tableName: 'user_has_meeting',
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
                name: "user_has_meeting_user_id_meeting_id_b171338a_uniq",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "user_id" },
                    { name: "meeting_id" },
                ]
            },
            {
                name: "user_has_meeting_meeting_id_8d417560_fk_meeting_id",
                using: "BTREE",
                fields: [
                    { name: "meeting_id" },
                ]
            },
        ]
    });
    return user_has_meeting;
};