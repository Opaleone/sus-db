const { User } = require('../src/models');
const { db } = require('../db/connection');

export default async function seed() {
  const users = [
    {
      userId: 109922839488994,
      userName: 'cycle_'
    },
    {
      userId: 109922839427283,
      userName: 'opal0744'
    }
  ]

  await db.sync({ force: true });
  await User.bulkCreate(users);

  console.log("Users injected");
}