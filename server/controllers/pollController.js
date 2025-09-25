import Poll from '../models/Poll.js';
import User from '../models/User.js';

export const createPoll = async (req, res) => {
  try {
    const { title, question, options, end, visibility, multicasting } = req.body;
    if (!title || !question || !options || options.length < 2 || !end) {
      return res.status(400).json({ msg: 'Invalid input' });
    }

    const formattedOptions = options.map(opt => ({ text: opt }));

    const poll = new Poll({
      title,
      question,
      options: formattedOptions,
      end,
      visibility: visibility || 'private',
      multicasting: multicasting ?? true,
      createdBy: req.user.id,
      isLive: true,
    });

    await poll.save();
    await User.findByIdAndUpdate(req.user.id, { $push: { createdPolls: poll._id } });

    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id).populate('createdBy', 'name email');
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });

    if (poll.isLive && poll.end < new Date()) {
      poll.isLive = false;
      await poll.save();
    }

    res.json(poll);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find({ visibility: 'public' })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    const updatedPolls = await Promise.all(
      polls.map(async poll => {
        if (poll.isLive && poll.end < new Date()) {
          poll.isLive = false;
          await poll.save();
        }
        return poll;
      })
    );

    res.json(updatedPolls);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const updatePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });
    if (poll.isLive) return res.status(400).json({ msg: 'Cannot update a live poll' });
    if (poll.createdBy.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });

    const { title, question, options, visibility, multicasting, end } = req.body;

    if (title) poll.title = title;
    if (question) poll.question = question;
    if (options && options.length >= 2) poll.options = options.map(opt => ({ text: opt }));
    if (visibility) poll.visibility = visibility;
    if (multicasting !== undefined) poll.multicasting = multicasting;
    if (end) poll.end = end;

    await poll.save();
    res.json(poll);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });

    if (poll.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await poll.deleteOne();
    res.json({ msg: 'Poll removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

export const castVote = async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });

    if (!poll.isLive || poll.end < new Date()) {
      poll.isLive = false;
      await poll.save();
      return res.status(400).json({ msg: 'Poll is closed' });
    }

    const user = await User.findById(req.user.id);
    if (user.votedin.includes(poll._id)) {
      return res.status(400).json({ msg: 'Already voted' });
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ msg: 'Invalid option' });
    }

    poll.options[optionIndex].count += 1;
    poll.totalVotes += 1;

    await poll.save();
    await User.findByIdAndUpdate(req.user.id, { $push: { votedin: poll._id } });

    res.json(poll);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const updateVisibility = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ msg: 'Poll not found' });

    if (poll.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    poll.visibility = req.body.visibility;
    await poll.save();

    res.json(poll);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
