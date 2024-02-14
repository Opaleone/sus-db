const { db, DataTypes } = require('../../db/connection');

const Responses = db.define(
  'Responses',
  {
    phrase: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
)

module.exports = Responses;