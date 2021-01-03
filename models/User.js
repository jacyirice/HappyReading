const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const user = sequelize.define('user', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: "user_id_address_id_3a675618_uniq"
        },
        first_name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: "email"
        },
        telephone: {
            type: DataTypes.STRING(11),
            allowNull: true,
            unique: "telephone"
        },
        password: {
            type: DataTypes.STRING(16),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'address',
                key: 'id'
            },
            unique: "user_address_id_d8fffd8c_fk_address_id"
        }
    }, {
        sequelize,
        tableName: 'user',
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
                name: "email",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "email" },
                ]
            },
            {
                name: "address_id",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "address_id" },
                ]
            },
            {
                name: "user_id_address_id_3a675618_uniq",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                    { name: "address_id" },
                ]
            },
            {
                name: "telephone",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "telephone" },
                ]
            },
        ]
    });
    user.associate = models => {
        user.hasOne(models.Address, { as: 'address', foreignKey: 'address_id' });
    }
    return user;
};