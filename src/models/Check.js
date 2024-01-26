const { db, DataTypes } = require('../../db/connection');

const Check = db.define(
  'Check',
  {
    date: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    size: DataTypes.INTEGER,
    status: DataTypes.STRING,
    guildId: {
      type: DataTypes.BIGINT,
      set(gid) {
        this.setDataValue('guildId', gid);
      }
    },
    userId: {
      type: DataTypes.BIGINT,
      set(uid) {
        this.setDataValue('userId', uid);
      }
    },
  }
)

module.exports = Check;