const { Router } = require('express');
const todosController = require('../controllers/todosController');

const router = Router();

router.post('/', todosController.createTodos);
router.get('/', todosController.getAllTodos);
router.get('/:idTodo', todosController.getOneTodos);
router.patch('/:idTodo', todosController.updatePatchTodos);

module.exports = router;
