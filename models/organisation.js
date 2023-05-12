"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Organisation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organisation.hasMany(models.User, {
        foreignKey: "organisation_id",
      });
      Organisation.hasMany(models.Project, {
        foreignKey: "organisation_id",
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
  Organisation.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Organisation",
    }
  );
  return Organisation;
};
