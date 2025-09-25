import express from 'express';
import {
  createPoll,
  getAllPolls,
  getPollById,
  updatePoll,
  deletePoll,
  castVote,
  updateVisibility,
} from '../controllers/pollController.js';
import ensureAuth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllPolls);
router.post('/create', ensureAuth, createPoll);
router.get('/:id', getPollById);
router.put('/:id', ensureAuth, updatePoll);
router.delete('/:id', ensureAuth, deletePoll);
router.post('/:id/vote', ensureAuth, castVote);
router.patch('/:id/visibility', ensureAuth, updateVisibility);

export default router;
