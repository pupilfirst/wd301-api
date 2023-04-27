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

      Project.belongsTo(models.Organization, {
        foreignKey: "organization_id",
      });
      Project.hasMany(models.Task, {
        foreignKey: "project_id",
      });
    }

    static getAll(organizationID) {
      return this.findAll({
        where: {
          organization_id: organizationID,
        },
      });
    }
    static show(projectID) {
      return this.findByPk(projectID);
    }

    static addProject({ name, organizationID }) {
      return this.create({ name, organization_id: organizationID });
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
