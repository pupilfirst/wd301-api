'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Comments", "task_id", {
      type: Sequelize.DataTypes.INTEGER
    });
    await queryInterface.addConstraint("Comments", {
      fields: ['task_id'],
      type: 'foreign key',
      references: {
         table: "Tasks",
         field: "id"
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Comments", "task_id")
  }
};
