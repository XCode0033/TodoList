import { Router } from 'express'
import {deleteTodo, getCreateTodoPage, getTodos, patchTodo, postTodo, todoById} from '../controllers/todo.controller'
const router = Router()

router.get("/todos", getTodos)
router.get("/createPage", getCreateTodoPage)



// -------------
router.post('/createTodo', postTodo)

// -------------



// ------
router.patch('/todos/:id', patchTodo)
router.delete('/todos/:id', deleteTodo)
// ------
router.get('/todos/:id', todoById)
export default router
