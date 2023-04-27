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
    await queryInterface.addColumn("Tasks", "project_id", {
      type: Sequelize.DataTypes.INTEGER
    });
    await queryInterface.addConstraint("Tasks", {
      fields: ['project_id'],
      type: 'foreign key',
      references: {
         table: "Projects",
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
    await queryInterface.removeColumn("Tasks", "project_id")
  }
};
