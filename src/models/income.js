const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const incomeSchema = sequelize.define(
    'income',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      incomeTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      transactionDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        // field: 'created_at',
        type: Sequelize.DATE,
      },
      updatedAt: {
        // field: 'updated_at',
        type: Sequelize.DATE,
      },
    },
    { underscored: true, freezeTableName: true },
  );

  return incomeSchema;
};
