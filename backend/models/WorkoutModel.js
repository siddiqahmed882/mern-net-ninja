const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkOutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Model definition
// ? Model name should be singular and collection is created based on model name being pluralized
const Workout = mongoose.model('Workout', WorkOutSchema);

module.exports = Workout;
