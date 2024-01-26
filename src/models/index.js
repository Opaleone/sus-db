const User = require('../models/User');
const Guild = require('../models/Guild');
const Check = require('../models/Check')

User.hasMany(Check);
Check.belongsTo(User);
Guild.hasMany(User);
User.belongsTo(Guild);

module.exports = {
  User,
  Guild,
  Check
}