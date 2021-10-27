module.exports = function(sequelize, DataTypes) {
    const Expense = sequelize.define("Expense", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        default: 0.00
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      repeat: {
        type: DataTypes.BOOLEAN,
        default: false
      },
      repeatPattern: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
  
    return Expense;
  };