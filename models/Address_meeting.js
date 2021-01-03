const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address_meeting', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    public_place: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    complement: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    uf: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    number: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    neighborhood: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    cep: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'address_meeting',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
