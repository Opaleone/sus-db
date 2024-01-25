const { User, Guild } = require('../src/models');
const { db } = require('../db/connection');

(async function seed() {
  const users = [
    {
      userId: 109922839488994,
      userName: 'cycle_',
    },
    {
      userId: 109922839427283,
      userName: 'opal0744',
    },
    {
      userId: 109922839481029,
      userName: '.gigglet',
    },
    {
      userId: 109922839421928,
      userName: 'hemmie49',
    },
    {
      userId: 109922839418293,
      userName: 'fred_wad',
    },
  ]

  const guilds = [
    {
      guildId: 1029834572733,
      channelId: null,
      checkAmount: 1,
    },
    {
      guildId: 10298345782383,
      channelId: null,
      checkAmount: null,
    }
  ]


  await db.sync({ force: true });
  const userCreate = await User.bulkCreate(users);
  const guildCreate = await Guild.bulkCreate(guilds);

  guildCreate[0].addUsers(userCreate[0]);
  guildCreate[1].addUsers(userCreate[1]);

  for (let i = 0; i < userCreate.length; i++) {
    guildCreate[Math.floor(Math.random() * 2)].addUsers(userCreate[i]);
  }

  console.log("Users injected");
})();