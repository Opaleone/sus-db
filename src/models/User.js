const { db, DataTypes } = require('../../db/connection');

const User = db.define(
  'User',
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    currentCheck: {
      type: DataTypes.UUID,
      set(checkId) {
        this.setDataValue(checkId);
      }
    },
  },
  {
    timestamps: true
  }
)

module.exports = User;