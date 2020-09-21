const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought
} = require('../../controllers/thought-controller');

// create at /api/thoughts/:userId
router.route('/:userId').post(createThought);

// get all at /api/thoughts
router
  .route('/')
  .get(getAllThoughts)

// get and update thought by id at /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  
  // delete thought and remove from user's thoughts[] at /api/:userId/:thoughtId 
router
  .route('/:userId/:thoughtId')
  .delete(deleteThought);

// reaction routes
const { createReaction, deleteReaction } = require('../../controllers/thought-controller');

// create reaction at /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction);

// delete reaction from /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);
  module.exports = router;