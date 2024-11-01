import mongoose from "mongoose";

const OPTION_SCHEMA = new mongoose.Schema({
  option: {
    type: String,
    required: true
  },
});

export const QUESTION_SCHEMA = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: false },
  question: {
    type: String
  },
  questionType: {
    type: String
  },
  options: [OPTION_SCHEMA],
  open: {
    type: Boolean,
  },
  required: {
    type: Boolean
  },
  answer: {
    type: Boolean
  },
  points: {
    type: Number
  }
});
