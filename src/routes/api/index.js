const router = require('express').Router();
const userRoutes = require('./user');
const guildRoutes = require('./guild');
const checkRoutes = require('./check');

router.use('/user', userRoutes);
router.use('/guild', guildRoutes);
router.use('/checks', checkRoutes);

module.exports = router;