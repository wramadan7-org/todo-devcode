const { Router } = require('express');
const activitiesController = require('../controllers/activitiesController');

const router = Router();

router.post('/', activitiesController.createActivities);
router.get('/', activitiesController.getAllActivities);
router.get('/:idActivities', activitiesController.getOneActivities);

module.exports = router;
