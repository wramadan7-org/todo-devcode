const { Router } = require('express');
const activitiesController = require('../controllers/activitiesController');

const router = Router();

router.post('/', activitiesController.createActivities);
router.get('/', activitiesController.getAllActivities);
router.get('/:idActivities', activitiesController.getOneActivities);
router.patch('/:idActivities', activitiesController.updatePatchActivities);
router.delete('/:idActivities', activitiesController.deleteActivies);

module.exports = router;
