/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('todos', ['activity_group_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('todos', ['activity_group_id']);
  },
};
