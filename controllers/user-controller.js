const { User, Thought } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(dbUser => res.json(dbUser))
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  },

  // get user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUser => {
        // if user cannot be found
        if (!dbUser) {
          res.status(404).json({ message: 'No user with this id!' });
          return;
        }
        res.json(dbUser)
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  },

  // create user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUser => res.json(dbUser))
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  },

  // update user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true }
    )
      .then(dbUser => {
        // if user cannot be found
        if (!dbUser) {
          res.status(404).json({ message: 'No user with this id!' });
          return;
        }
        res.json(dbUser);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  },

  // remove user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUser => {
        // if user cannot be found
        if (!dbUser) {
          res.status(404).json({ message: 'No user with this id!' });
          return;
        }
        res.json(dbUser);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  },

  // add a friend to the friends array
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId} },
      { new: true }
    )
      .then(dbUser => {
        if (!dbUser) {
          res.status(404).json({ message: 'No user with this id!' });
          return;
        }
        res.json(dbUser);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  },

  // remove a friend from friends array
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUser => {
        if (!dbUser) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUser);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  }
};

module.exports = userController;