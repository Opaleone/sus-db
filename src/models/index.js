const User = require('../models/User');
const Guild = require('../models/Guild');
const Check = require('../models/Check')

User.hasMany(Check);
Guild.hasMany(Check);

module.exports = {
  User,
  Guild,
  Check
}