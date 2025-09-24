const express = require('express');
const router = express.Router();
const {
  createPoll,
  getAllPolls,
  getPollById,
  updatePoll,
  deletePoll,
  castVote,
  updateVisibility,
} = require('../controllers/PollController');
const { ensureAuth } = require('../middleware/auth');


router.get('/', getAllPolls);


router.post('/', ensureAuth, createPoll);


router.get('/:id', getPollById);

router.put('/:id', ensureAuth, updatePoll);

router.delete('/:id', ensureAuth, deletePoll);

router.post('/:id/vote', ensureAuth, castVote);

router.patch('/:id/visibility', ensureAuth, updateVisibility);

module.exports = router;