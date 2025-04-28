const router = require('express').Router();
const todoController = require('../controllers/todoController');
const authenticate = require('../middlewares/auth'); 

router.get('/todo', authenticate, todoController.getAllTodo);
router.post('/todo', authenticate, todoController.createTodo);
router.put('/todo/:id', authenticate, todoController.updateTodo);
router.delete('/todo/:id', authenticate, todoController.deleteTodo);

module.exports = router;