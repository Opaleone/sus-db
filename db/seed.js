const { User, Guild, Check } = require('../src/models');
const { db } = require('../db/connection');

(async function seed() {
  const users = [
    {
      userId: 1099228394889943889n,
      userName: 'cycle_',
    },
    {
      userId: 109922839427283122n,
      userName: 'opal0744',
    },
    {
      userId: 1099228394810291233n,
      userName: '.gigglet',
    },
    {
      userId: 109922839421928283774n,
      userName: 'hemmie49',
    },
    {
      userId: 109922839418293192002n,
      userName: 'fred_wad',
    },
    {
      userId: 1029383854950410029n,
      userName: 'Jesse'
    },
    {
      userId: 1029383854950410122n,
      userName: 'James'
    },
    {
      userId: 1029383854950410394n,
      userName: 'Jason'
    },
    {
      userId: 1029383854950410293n,
      userName: 'Lilah'
    },
    {
      userId: 1029383854950410857n,
      userName: 'Sam'
    }
  ]

  const guilds = [
    {
      guildId: 690308107007557652n,
      guildName: 'THE BOIS',
      channelId: 1171394157475008572n,
      checkAmount: 1,
    },
    {
      guildId: 998648963064410132n,
      guildName: 'MammothChunks\'s Server',
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
  const guildCreate = await Guild.bulkCreate(guilds);
  const userCreate = await User.bulkCreate(users);
  const checkCreate = await Check.bulkCreate(checks);

  for (let i = 0; i < userCreate.length; i++) {
    if (i % 2 === 0) await guildCreate[0].addUser(userCreate[i]);
    else await guildCreate[1].addUser(userCreate[i]);
  }

  for (let i = 0, j = 0; i < 1; i++, j++) {
    const usr = userCreate[j];
    let curUser = await User.findOne({
      where: {
        userName: usr.userName
      },
      include: Guild
    })

    console.log(curUser);

    checkCreate[i].setUser(curUser);
  }

  console.log("Users injected");
})();