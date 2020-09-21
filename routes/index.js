const router = require('express').Router();
// import api routes from /api
const apiRoutes = require('./api');

// add prefix of '/api' to all apiRoutes
router.use('/api', apiRoutes);

// export routes
module.exports = router;


