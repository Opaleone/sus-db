const User = require('../models/User');
const Guild = require('../models/Guild');
const Check = require('../models/Check')

User.belongsToMany(Guild, { through: 'user_guild'})
User.hasMany(Check);

Guild.belongsToMany(User, { through: 'user_guild'});
Guild.hasMany(Check);

Check.belongsTo(User);
Check.belongsTo(Guild);

module.exports = {
  User,
  Guild,
  Check
}