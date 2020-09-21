const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');


// add prefix of '/users' to userRoutes
router.use('/users', userRoutes);
// add prefix of '/thoughts' to thoughtRoutes.  Also handles reaction routes
router.use('/thoughts', thoughtRoutes);

module.exports = router;