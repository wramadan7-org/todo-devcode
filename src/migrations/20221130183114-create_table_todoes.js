/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'todoes',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        activityGroupId: {
          type: Sequelize.INTEGER,
          field: 'activity_group_id',
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          field: 'is_active',
          allowNull: false,
        },
        priority: {
          type: Sequelize.ENUM('very-high', 'high', 'medium', 'low', 'very-low'),
          defaultValue: 'medium',
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: 'created_at',
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at',
          allowNull: false,
        },
        deletedAt: {
          type: Sequelize.DATE,
          field: 'deleted_at',
          allowNull: true,
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('todoes');
  },
};
