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
    }
  },
  {
    timestamps: true
  }
)

module.exports = User;