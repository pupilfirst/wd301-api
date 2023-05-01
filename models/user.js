"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Organization, {
        foreignKey: "organization_id",
      });
      User.hasMany(models.Task, {
        foreignKey: "assignee",
      });
      User.hasMany(models.Comment, {
        foreignKey: "owner",
      });
    }
    static list(organizationID) {
      return this.findAll({
        where: {
          organization_id: organizationID,
        },
        attributes: {
          exclude: ["password"],
        },
      });
    }
    static details(userID) {
      return this.findByPk(userID, {
        attributes: {
          exclude: ['password']
        }
      })
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
