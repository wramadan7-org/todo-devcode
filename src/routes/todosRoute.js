const { Router } = require('express');
const todosController = require('../controllers/todosController');

const router = Router();

router.post('/', todosController.createTodoes);

module.exports = router;
