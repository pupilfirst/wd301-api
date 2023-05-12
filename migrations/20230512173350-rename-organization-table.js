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
    await queryInterface.renameTable("Organizations", "Organisations")
    await queryInterface.renameColumn("Users", "organization_id", "organisation_id")
    await queryInterface.renameColumn("Projects", "organization_id", "organisation_id")

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameTable("Organisations", "Organizations")
    await queryInterface.renameColumn("Users", "organisation_id", "organization_id")
    await queryInterface.renameColumn("Projects", "organisation_id", "organization_id")
  }
};
