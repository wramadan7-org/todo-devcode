const { Router } = require('express');
const activities = require('./activitiesRoute');

const router = Router();

const defaultRoutes = [
  {
    path: '/activity-groups',
    route: activities,
  },
];

defaultRoutes.forEach((value) => {
  router.use(value.path, value.route);
});

module.exports = router;
