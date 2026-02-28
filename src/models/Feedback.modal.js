const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 100,
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: null,
    },
    status: {
      type: String,
      enum: ["new", "reviewed"],
      default: "new",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // optional if feedback is tied to logged-in users
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;