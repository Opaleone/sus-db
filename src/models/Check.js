const { db, DataTypes } = require('../../db/connection');

const Check = db.define(
  'Check',
  {
    date: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    size: DataTypes.INTEGER,
    status: DataTypes.STRING
  }
)

module.exports = Check;