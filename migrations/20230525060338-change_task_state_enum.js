"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Step 1: Create a new temporary enum type
      await queryInterface.sequelize.query(
        `CREATE TYPE new_enum_Tasks_state AS ENUM ('new', 'pending', 'in_progress', 'done')`,
        { transaction }
      );
      await queryInterface.sequelize.query(
        `ALTER TABLE "Tasks" ALTER COLUMN state TYPE new_enum_Tasks_state USING state::text::new_enum_Tasks_state`,
        { transaction }
      );
      await queryInterface.sequelize.query(
        `UPDATE "Tasks" SET state = 'pending' WHERE state = 'new'`,
        { transaction }
      );

      await queryInterface.sequelize.query(
        `CREATE TYPE final_enum_Tasks_state AS ENUM ('pending', 'in_progress', 'done')`,
        { transaction }
      );
      await queryInterface.sequelize.query(
        `ALTER TABLE "Tasks" ALTER COLUMN state TYPE final_enum_Tasks_state USING state::text::final_enum_Tasks_state`,
        { transaction }
      );

      await queryInterface.sequelize.query(`DROP TYPE "enum_Tasks_state"`, {
        transaction,
      });
      await queryInterface.sequelize.query(`DROP TYPE new_enum_Tasks_state`, {
        transaction,
      });
      await queryInterface.sequelize.query(
        `ALTER TYPE final_enum_Tasks_state RENAME TO "enum_Tasks_state"`,
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Step 1: Create a new temporary enum type
      await queryInterface.sequelize.query(
        `CREATE TYPE enum_type AS ENUM ('new', 'pending', 'in_progress', 'done')`,
        { transaction }
      );
      await queryInterface.sequelize.query(
        `ALTER TABLE "Tasks" ALTER COLUMN state TYPE enum_type USING state::text::enum_type`,
        { transaction }
      );

      // Step 3: Drop the old enum type
      await queryInterface.sequelize.query(`DROP TYPE "enum_Tasks_state"`, {
        transaction,
      });

      await queryInterface.sequelize.query(
        `ALTER TYPE enum_type RENAME TO "enum_Tasks_state"`,
        { transaction }
      );
      await queryInterface.sequelize.query(
        `UPDATE "Tasks" SET state = 'new' WHERE state = 'pending'`
      ),
        { transaction };
      transaction.commit();
    });
  },
};
