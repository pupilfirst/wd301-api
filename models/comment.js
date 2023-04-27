"use strict";
const { Model, where } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Task, {
        foreignKey: "task_id",
      });
      Comment.belongsTo(models.User, {
        foreignKey: "owner",
      });
    }
    static getAll(taskID) {
      return this.findAll({
        where: {
          task_id: taskID,
        },
      });
    }
    static show(commentID) {
      return this.findByPk(commentID);
    }

    static add({ organizationID, projectID, taskID, description, owner }) {
      return this.create({
        description,
        owner,
        project_id: projectID,
        organization_id: organizationID,
        task_id: taskID,
      });
    }
  }
  Comment.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
