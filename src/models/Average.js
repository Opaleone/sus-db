const { db, DataTypes } = require('../../db/connection');

const Average = db.define(
  'Average',
  {
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    avg: DataTypes.INTEGER,
  }
)

module.exports = Average;