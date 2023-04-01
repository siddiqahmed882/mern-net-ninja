const { Router } = require('express');
const WorkoutController = require('../controllers/WorkoutController');

const router = Router();

router.use(require('../middleware/requireAuth'));

router.get('/', WorkoutController.index);

router.get('/:id', WorkoutController.show);

router.post('/', WorkoutController.create);

router.patch('/:id', WorkoutController.update);

router.delete('/:id', WorkoutController.destroy);

module.exports = router;
