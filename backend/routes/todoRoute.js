const router = require('express').Router()
const todoController = require('../controllers/todoController')

router.get('/todo', todoController.getAllTodo)
router.post('/todo', todoController.createTodo)
router.put('/todo/:id', todoController.updateTodo)

module.exports = router