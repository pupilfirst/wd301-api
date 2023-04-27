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
    await queryInterface.addColumn("Users", "organization_id", {
      type: Sequelize.DataTypes.INTEGER
    });
    await queryInterface.addConstraint("Users", {
      fields: ['organization_id'],
      type: 'foreign key',
      references: {
         table: "Organizations",
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
    await queryInterface.removeColumn("Users", "organization_id")
  }
};
