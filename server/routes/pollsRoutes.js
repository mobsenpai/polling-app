import express from "express";
import {
  createPoll,
  getPolls,
  getPollById,
  updatePoll,
  deletePoll,
} from "../controllers/pollController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CRUD
router.post("/create", protect, createPoll);
router.get("/", getPolls);
router.get("/:id", getPollById);
router.put("/:id", protect, updatePoll);
router.delete("/:id", protect, deletePoll);

export default router;
