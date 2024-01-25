const router = require('express').Router();
const userRoutes = require('./user');
const guildRoutes = require('./guild')

router.use('/user', userRoutes);
router.use('/guild', guildRoutes)

module.exports = router;