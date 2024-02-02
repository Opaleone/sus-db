const { User, Guild } = require('../src/models');

module.exports = {
  confirmCreate: async (uid, gid, uname, gname) => {
    let curGuild = await Guild.findOne({
      where: {
        guildId: gid
      }
    })

    let curUser = await User.findOne({
      where: {
        userId: uid
      }
    })

    if (!curGuild) {
      curGuild = await Guild.create({
        guildId: gid,
        guildName: gname
      })
    }

    if (!curUser) {
      curUser = await User.create({
        userId: uid,
        userName: uname,
      })
    }

    curGuild.addUser(curUser);
    curUser.addGuild(curGuild);

    return { curGuild, curUser };
  }
}