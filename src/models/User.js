const { db, DataTypes } = require('../../db/connection');

const User = db.define(
  'User',
  {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    size: DataTypes.INTEGER,
    status: DataTypes.STRING,
  },
  {
    timestamps: true
  }
)

module.exports = User;