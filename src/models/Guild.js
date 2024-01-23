const { db, DataTypes } = require('../../db/connection');

const Guild = db.define(
  'Guild',
  {
    guildId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data: {
      date: {
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      size: DataTypes.INTEGER,
      status: DataTypes.STRING
    },
    userId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'user',
        key: 'userId'
      }
    }
  }
)

module.exports = Guild;