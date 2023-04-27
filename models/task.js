'use strict';
const {
  Model
} = require('sequelize');
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
        foreignKey: "project_id"
      })
      Task.belongsTo(models.User, {
        foreignKey: "assignee"
      })
      Task.hasMany(models.Comment, {
        foreignKey: "task_id",
      })
    }
  }
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    state: DataTypes.ENUM('new', 'in_progress', 'done')
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};