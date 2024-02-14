const router = require('express').Router();
const userRoutes = require('./user');
const guildRoutes = require('./guild');
const checkRoutes = require('./check');
const suspiciousRoutes = require('./suspicious');
const responsesRoutes = require('./resonses');

router.use('/user', userRoutes);
router.use('/guild', guildRoutes);
router.use('/checks', checkRoutes);
router.use('/suspicious', suspiciousRoutes);
router.use('/responses', responsesRoutes);

module.exports = router;