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
} = require('../controllers/pollController.js');
const { ensureAuth } = require('../middleware/auth');

router.get('/api/auth/', getAllPolls);


router.post('/api/auth/', ensureAuth, createPoll);


router.get('/api/auth/:id', getPollById);

router.put('/api/auth/:id', ensureAuth, updatePoll);

router.delete('/api/auth/:id', ensureAuth, deletePoll);

router.post('/api/auth/:id/vote', ensureAuth, castVote);

router.patch('/api/auth/:id/visibility', ensureAuth, updateVisibility);

module.exports = router;