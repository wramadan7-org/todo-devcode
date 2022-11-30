const { Router } = require('express');
const activitiesRoute = require('./activitiesRoute');
const todoesRoute = require('./todosRoute');

const router = Router();

const defaultRoutes = [
  {
    path: '/activity-groups',
    route: activitiesRoute,
  },
  {
    path: '/todo-items',
    route: todoesRoute,
  },
];

defaultRoutes.forEach((value) => {
  router.use(value.path, value.route);
});

module.exports = router;
