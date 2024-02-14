const { db, DataTypes } = require('../../db/connection');

const Suspicious = db.define(
  'Suspicious',
  {
    word: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
)

module.exports = Suspicious;