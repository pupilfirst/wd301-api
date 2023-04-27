"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.hasMany(models.User, {
        foreignKey: "organization_id",
      });
      Organization.hasMany(models.Project, {
        foreignKey: "organization_id",
      });
    }

    static add(name) {
      return this.create({
        name,
      });
    }
    static show(orgID) {
      return this.findByPk(orgID);
    }
    static delete(orgID) {
      return this.destroy({
        where: {
          id: orgID,
        },
      });
    }
  }
  Organization.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Organization",
    }
  );
  return Organization;
};
