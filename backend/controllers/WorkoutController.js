const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

/**
 * Get All Workouts
 * @param {Request} req
 * @param {Response} res
 */
async function index(req, res) {
  try {
    // get workouts in descending order
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ workouts });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

/**
 * Get a single Workout
 * @param {Request} req
 * @param {Response} res
 */
async function show(req, res) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Workout not found' });
  }

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: 'Workout not  found' });
    }

    return res.status(200).json({ workout });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

/**
 * Create a new Workout
 * @param {Request} req
 * @param {Response} res
 */
async function create(req, res) {
  const { title, reps, load } = req.body;

  let emptyFields = [];
  if (title.length === 0) emptyFields.push('title');
  if (reps == null || reps == undefined || isNaN(reps))
    emptyFields.push('reps');
  if (load == null || load == undefined || isNaN(load))
    emptyFields.push('load');

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in the fields properly', emptyFields });
  }

  try {
    const workout = await Workout.create({ title, reps, load });
    return res.status(200).json({ workout: workout });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

/**
 * Update a Workout
 * @param {Request} req
 * @param {Response} res
 */
async function update(req, res) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Workout not found' });
  }

  try {
    const workout = await Workout.findByIdAndUpdate(id, { ...req.body });

    if (!workout) {
      return res.status(404).json({ error: 'Workout not  found' });
    }

    return res.status(200).json({ workout: { ...workout._doc, ...req.body } });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

/**
 * Delete a Workout
 * @param {Request} req
 * @param {Response} res
 */
async function destroy(req, res) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Workout not found' });
  }

  try {
    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(404).json({ error: 'Workout not  found' });
    }

    return res.sendStatus(204);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
