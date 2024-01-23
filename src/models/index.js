const User = require('../models/User');
const Guild = require('../models/Guild');

User.hasMany(Guild, {
  foreignKey: 'userId',
  onDelete: "CASCADE"
});

Guild.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = {
  User,
  Guild
}
