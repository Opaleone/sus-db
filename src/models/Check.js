const { db, DataTypes } = require('../../db/connection');

const Check = db.define(
  'Check',
  {
    date: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    size: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }
)

module.exports = Check;