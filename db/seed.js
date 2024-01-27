const { User, Guild, Check } = require('../src/models');
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

  const checks = [
    {
      size: 12,
      status: 'hard'
    },
    {
      size: 15,
      status: 'hard'
    },
    {
      size: 2,
      status: 'soft'
    },
    {
      size: 8,
      status: 'hard'
    },
    {
      size: 5,
      status: 'soft'
    },
    {
      size: 9,
      status: 'hard'
    }
  ]


  await db.sync({ force: true });
  const userCreate = await User.bulkCreate(users);
  const guildCreate = await Guild.bulkCreate(guilds);
  const checkCreate = await Check.bulkCreate(checks);

  console.log(userCreate[0]);
  console.log(guildCreate[0]);
  console.log(checkCreate[0]);

  for (let i = 0; i < userCreate.length; i++) {
    guildCreate[Math.floor(Math.random() * guildCreate.length)].addUsers(userCreate[i]);
  }

  for (let i = 0; i < checkCreate.length; i++) {
    userCreate[Math.floor(Math.random() * userCreate.length)].addCheck(checkCreate[i]);
  }

  console.log("Users injected");
})();