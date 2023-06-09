"use strict";
const { Model, QueryTypes } = require("sequelize");
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
      return sequelize.query(
        `SELECT "JR".state, jsonb_agg(row_to_json("JR")) as items FROM (SELECT "Tasks".id, "Tasks".state, "Tasks".description, "Tasks".title, "Tasks"."dueDate", "Users".name as "assignedUserName", "Users".id as "assignee" FROM "Tasks" LEFT JOIN "Users" on "Tasks"."assignee"="Users"."id"  WHERE "Tasks"."project_id" = '${projectID}') "JR" GROUP BY "JR".state ORDER BY "JR".state`,
        { type: QueryTypes.SELECT }
      );
    }

    static show(taskID) {
      return this.findByPk(taskID);
    }

    static addTask({
      title,
      description,
      state,
      dueDate,
      projectID,
      organisationID,
    }) {
      // TODO: verify project and task is under the authenticaated org?
      return this.create({
        title,
        description,
        state,
        dueDate,
        project_id: projectID,
        organisation_id: organisationID,
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
      dueDate: DataTypes.DATE,
      state: DataTypes.ENUM("pending", "in_progress", "done"),
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
