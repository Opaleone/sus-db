const { db, DataTypes } = require('../../db/connection');

const Guild = db.define(
  'Guild',
  {
    guildId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    guildName: DataTypes.STRING,
    checkAmount: DataTypes.INTEGER,
    channelId: DataTypes.BIGINT,
  }
)

module.exports = Guild;