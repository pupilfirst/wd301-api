"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Project, {
        foreignKey: "project_id",
      });
      Task.belongsTo(models.User, {
        foreignKey: "assignee",
      });
      Task.hasMany(models.Comment, {
        foreignKey: "task_id",
      });
    }

    static getAll(projectID) {
      return this.findAll({
        where: {
          project_id: projectID
        }
      });
    }
    static show(taskID) {
      return this.findByPk(taskID);
    }

    static addTask({ title, description, state, dueDate, projectID, organizationID }) {
      // TODO: verify project and task is under the authenticaated org?
      return this.create({
        title,
        description,
        state,
        dueDate,
        project_id: projectID,
        organization_id: organizationID,
      });
    }

    static deleteTask({ taskID, projectID }) {
      return this.destroy({
        where: {
          id: taskID,
          project_id: projectID,
        },
      });
    }
  }
  Task.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      state: DataTypes.ENUM("new", "in_progress", "done"),
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
