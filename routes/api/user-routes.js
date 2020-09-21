const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

// get all and create at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// get one, update and delete at /api/users/:userid
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// add and remove friends from /api/users/:userid/friends/:friendId
router
  .route('/:id/friends/:friendId')
  .post(addFriend)
  .put(removeFriend);

module.exports = router;