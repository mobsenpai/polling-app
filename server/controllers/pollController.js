const Poll = require('../models/Poll');
const { io } = require('../server');

exports.createPoll = async (req, res) => {
  try {
    const { question, options, visibility } = req.body;

    if (!title || !options || options.length < 2) {
      return res.status(400).json({ msg: 'Please provide a title and at least two options.' });
    }

    const newPoll = new Poll({
      question,
      options: options.map(text => ({ text, count: 0 })),
      creator: req.user.id,
      visibility,
    });

    const poll = await newPoll.save();
    res.status(201).json(poll);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find().populate('creator', 'name').sort({ createdAt: -1 });
    res.json(polls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id).populate('creator', 'name profilePic');
    if (!poll) {
      return res.status(404).json({ msg: 'No polls found' });
    }
    res.json(poll);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updatePoll = async (req, res) => {
  try {
    let poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ msg: 'Poll not found' });
    }
    if (poll.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    const { title, description, options, visibility } = req.body;
    if (title) poll.title = title;
    if (description) poll.description = description;
    if (options && options.length >= 2) {
      poll.options = options.map(text => ({ text, count: 0 }));
      poll.votes = [];
    }
    if (visibility) poll.visibility = visibility;
    await poll.save();
    res.json(poll);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ msg: 'Poll not found' });
    }
    if (poll.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await poll.remove();
    res.json({ msg: 'Poll removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.castVote = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    const userId = req.user.id;
    const { optionIndex } = req.body;

    if (!poll) {
      return res.status(404).json({ msg: 'Poll not found' });
    }

    const userHasVoted = poll.votes.some(vote => vote.userId.toString() === userId);
    if (userHasVoted) {
      return res.status(400).json({ msg: 'You have already voted on this poll' });
    }
    
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ msg: 'Invalid option index' });
    }

    poll.options[optionIndex].count++;
    poll.votes.push({ userId, optionIndex });

    await poll.save();

    res.json(poll);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.updateVisibility = async (req, res) => {
  try {
    let poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ msg: 'Poll not found' });
    }

    if (poll.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    poll.visibility = req.body.visibility;
    await poll.save();

    res.json(poll);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};