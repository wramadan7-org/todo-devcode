const { Router } = require('express');
const activitiesController = require('../controllers/activitiesController');

const router = Router();

router.post('/', activitiesController.createActivities);
router.get('/', activitiesController.getAllActivities);

module.exports = router;
