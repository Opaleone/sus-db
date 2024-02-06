const { User, Guild } = require('../src/models');

module.exports = {
  confirmCreate: async (uid, gid, uname, gname) => {
    let curUser = await User.findOne({
      where: {
        userId: uid
      }
    })

    let curGuild = await Guild.findOne({
      where: {
        guildId: gid
      }
    })

    if (!curUser) {
      curUser = await User.create({
        userId: uid,
        userName: uname,
      })
    }

    if (!curGuild) {
      curGuild = await Guild.create({
        guildId: gid,
        guildName: gname
      })
    }

    curGuild.addUser(curUser);

    return { curGuild, curUser };
  }
}