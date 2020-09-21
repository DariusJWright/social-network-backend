const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .select('-__v')
    .then(dbThought => res.json(dbThought))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
  },

  // get thought by id  
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .then( dbThought => {
        // If thought cannot be found
        if (!dbThought) {
          res.status(404).json({ message: 'No thought with this id!' })
          return;
        }
        res.json(dbThought);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  },

  // create a new thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findByIdAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then(dbThought => {
      // if thought cannot be found
      if (!dbThought) {
        res.status(404).json({ message: 'No thought with this id!' });
        return;
      }
      res.json(dbThought);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
  },

  // update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      body,
      { new : true, runValidators: true }
    )
    .then(dbThought => {
      // if thought cannot be found
      if (!dbThought) {
        res.status(404).json({ message: 'No thought with this id!' });
        return;
      }
      res.json(dbThought);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
  },

  // delete a thought by id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(dbThought => {
        // if thought cannot be found
        if (!dbThought) {
          res.status(404).json({ message: 'No thought with this id!' });
          return;
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
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

  // add reaction to thought
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThought => {
        if (!dbThought) {
          res.status(404).json({ message: 'No thought with this id!' });
          return;
        }
        res.json(dbThought);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  },

  // delete reaction and pull from thought.reactions[]
  deleteReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId},
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbThought => {
      if (!dbThought) {
        res.status(404).json({ message: 'No thought with this id!' });
        return;
      }
      res.json(dbThought);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
  }
};

module.exports = thoughtController;