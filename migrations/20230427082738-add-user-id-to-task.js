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
    await queryInterface.addColumn("Tasks", "assignee", {
      type: Sequelize.DataTypes.INTEGER
    });
    await queryInterface.addConstraint("Tasks", {
      fields: ['assignee'],
      type: 'foreign key',
      references: {
         table: "Users",
         field: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Tasks", "assignee")
  }
};