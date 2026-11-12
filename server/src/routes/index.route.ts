import { Router } from 'express'
import {deleteTodo, getCreateTodoPage, getTodos, patchTodo, postTodo, todoById} from '../controllers/todo.controller'
import { validateBody } from '../middleware/validate'
import { getCalendar } from '../controllers/calendarController'
import { createTodoSchema } from '../schemas/todo.schema'
const router = Router()

router.get("/todos", getTodos)
router.get("/createPage", getCreateTodoPage)
router.get("/calendar", getCalendar)


// -------------
router.post('/createTodo', validateBody(createTodoSchema), postTodo)

// -------------



// ------
router.patch('/todos/:id', patchTodo)
router.delete('/todos/:id', deleteTodo)
// ------
router.get('/todos/:id', todoById)
export default router
