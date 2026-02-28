const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback.modal");

router.post("/feedback", async (req, res) => {
  try {
    const { name, email, feedback, rating } = req.body;
    const userId = req.userIds;
    const newFeedback = await Feedback.create({
      userId,
      name,
      email,
      feedback,
      rating,
      userId,
    });

    res.status(201).json({
      status: "success",
      message: "Feedback submitted successfully",
      data: newFeedback,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to submit feedback" });
  }
});

module.exports = router;