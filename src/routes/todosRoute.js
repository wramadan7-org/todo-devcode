const { Router } = require('express');
const todosController = require('../controllers/todosController');

const router = Router();

router.post('/', todosController.createTodos);
router.get('/', todosController.getAllTodos);

module.exports = router;
