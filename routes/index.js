const router = require('express').Router();
// inport api routes from /api
const apiRoutes = require('./api');

// add prefix of '/api' to all apiRoutes
router.use('/api', apiRoutes);

module.exports = router;


