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
    await queryInterface.addColumn("Comments", "owner", {
      type: Sequelize.DataTypes.INTEGER
    });
    await queryInterface.addConstraint("Comments", {
      fields: ['owner'],
      type: 'foreign key',
      references: {
         table: "Users",
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
    await queryInterface.removeColumn("Comments", "owner")
  }
};
