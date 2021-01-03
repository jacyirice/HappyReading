const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const meeting = sequelize.define('meeting', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: "meeting_id_book_id_address_meeting_id_user_id_eaf83195_uniq"
        },
        type: {
            type: DataTypes.SMALLINT,
            allowNull: false
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
        address_meeting_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'address_meeting',
                key: 'id'
            },
            unique: "meeting_address_meeting_id_09b8c2da_fk_address_meeting_id"
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'book',
                key: 'id'
            },
            unique: "meeting_id_book_id_address_meeting_id_user_id_eaf83195_uniq"
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            },
            unique: "meeting_id_book_id_address_meeting_id_user_id_eaf83195_uniq"
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
                name: "address_meeting_id",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "address_meeting_id" },
                ]
            },
            {
                name: "meeting_id_book_id_address_meeting_id_user_id_eaf83195_uniq",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                    { name: "book_id" },
                    { name: "address_meeting_id" },
                    { name: "user_id" },
                ]
            },
            {
                name: "meeting_book_id_4968ad1d_fk_book_id",
                using: "BTREE",
                fields: [
                    { name: "book_id" },
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
    // meeting.associate = models => {
    //     meeting.belongsTo(models.Book, { as: 'book', foreignKey: 'book_id' });
    //     meeting.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    //     meeting.hasOne(models.Address_meeting, { as: 'address', foreignKey: 'address_meeting_id' });
    // }

    return meeting;
};