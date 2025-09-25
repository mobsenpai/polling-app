import Poll from "../models/Poll.js";
import User from "../models/User.js";

// Create a new poll
export const createPoll = async (req, res) => {
  try {
    const { title, question, options, multicasting, isLive, visibility, start, end } = req.body;

    const poll = new Poll({
      title,
      question,
      options: options.map((opt) => ({ text: opt })), // options as array of {text, count: 0}
      multicasting,
      isLive,
      createdBy: req.user._id, // assumes you attach user via auth middleware
      visibility,
      start,
      end,
    });

    await poll.save();
    res.status(201).json({ message: "Poll created successfully", poll });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating poll" });
  }
};

// Get all polls (formatted)
export const getPolls = async (req, res) => {
  try {
    const polls = await Poll.find()
      .populate("createdBy", "name _id")
      .sort({ createdAt: -1 });

    const formatted = polls.map((poll) => {
      const now = new Date();
      const status = now > poll.end ? "Closed" : "Open";

      return {
        _id: poll._id,
        name: poll.title,
        question: poll.question,
        status,
        totalVotes: poll.totalVotes,
        creator: poll.createdBy,
      };
    });

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching polls" });
  }
};

// Get single poll
export const getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id).populate("createdBy", "name _id");

    if (!poll) return res.status(404).json({ message: "Poll not found" });

    const now = new Date();
    const status = now > poll.end ? "Closed" : "Open";

    res.json({
      _id: poll._id,
      name: poll.title,
      question: poll.question,
      status,
      totalVotes: poll.totalVotes,
      creator: poll.createdBy,
      options: poll.options,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching poll" });
  }
};

// Update poll
export const updatePoll = async (req, res) => {
  try {
    const poll = await Poll.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    res.json({ message: "Poll updated successfully", poll });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating poll" });
  }
};

// Delete poll
export const deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findByIdAndDelete(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    res.json({ message: "Poll deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting poll" });
  }
};
