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
    await queryInterface.addColumn("Projects", "organization_id", {
      type: Sequelize.DataTypes.INTEGER
    });
    await queryInterface.addConstraint("Projects", {
      fields: ['organization_id'],
      type: 'foreign key',
      references: {
         table: "Organizations",
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
    await queryInterface.removeColumn("Projects", "organization_id")
  }
};
