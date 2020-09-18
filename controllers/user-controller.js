const { User } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(dbUser => res.json(dbUser))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'Thought',
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
        res.status(400).json(err);
      });
  },

  // create user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUser => res.json(dbUser))
      .catch(err => {
        console.log(err);
        res.json(err)
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
        res.status(400).json(err);
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
      res.status(400).json(err);
    })
  }
}

module.exports = userController;