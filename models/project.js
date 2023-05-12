"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Project.belongsTo(models.Organisation, {
        foreignKey: "organisation_id",
      });
      Project.hasMany(models.Task, {
        foreignKey: "project_id",
      });
    }

    static getAll(organisationID) {
      return this.findAll({
        where: {
          organisation_id: organisationID,
        },
      });
    }
    static show(projectID) {
      return this.findByPk(projectID);
    }

    static addProject({ name, organisationID }) {
      return this.create({ name, organisation_id: organisationID });
    }

    static changeName(projectID, name) {
      return this.update(
        { name },
        {
          where: {
            id: projectID,
          },
        }
      );
    }
  }
  Project.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
