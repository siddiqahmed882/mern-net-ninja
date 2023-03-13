const Workout = require('../models/WorkoutModel');

function index(req, res) {}

function show(req, res) {}

async function create(req, res) {
  const { title, reps, load } = req.body;

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json({ workout: workout });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function update(req, res) {}

function destroy(req, res) {}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
