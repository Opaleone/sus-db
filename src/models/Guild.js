const { db, DataTypes } = require('../../db/connection');

const Guild = db.define(
  'Guild',
  {
    guildId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    guildName: DataTypes.STRING,
    checkAmount: DataTypes.INTEGER,
    channelId: DataTypes.STRING,
  }
)

module.exports = Guild;