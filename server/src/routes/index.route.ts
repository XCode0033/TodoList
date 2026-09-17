import { Router } from 'express'
import {deleteTodo, getCreateTodoPage, getTodos, postTodo} from '../controllers/todo.controller'
const router = Router()

router.get("/todos", getTodos)
router.get("/createPage", getCreateTodoPage)



// -------------
router.post('/createTodo', postTodo)

// -------------



// ------
router.delete('/todos/:id', deleteTodo)
// ------
export default router
