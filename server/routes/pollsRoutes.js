import express from "express";
import {
  createPoll,
  getPolls,
  getPollById,
  updatePoll,
  deletePoll,
} from "../controllers/pollController.js";
import authenticateJWT from '../middleware/verifyJwt.js'

const router = express.Router();

// CRUD
router.post("/create", authenticateJWT, createPoll);
router.get("/", authenticateJWT, getPolls);
router.get("/:id", authenticateJWT, getPollById);
router.put("/:id", authenticateJWT, updatePoll);
router.delete("/:id", authenticateJWT, deletePoll);

export default router;
