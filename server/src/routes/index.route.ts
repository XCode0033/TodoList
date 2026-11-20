import { Router } from 'express'
import {deleteTodo, getCreateTodoPage, getTodos, patchTodo, postTodo, todoById, register, login} from '../controllers/todo.controller'
import { validateBody } from '../middleware/validate'
import { getCalendar } from '../controllers/calendarController'
import { createTodoSchema } from '../schemas/todo.schema'
import { loginSchema, registerSchema } from '../schemas/auth.schema'

const router = Router()

router.get('/health', (req, res) => {
    res.json({status: 'ok'})
})
router.get("/todos", getTodos)
router.get("/createPage", getCreateTodoPage)
router.get("/calendar", getCalendar)


// -------------
router.post('/createTodo', validateBody(createTodoSchema), postTodo)
router.post('/auth/register', validateBody(registerSchema), register)
router.post('/auth/login', validateBody(loginSchema), login)
// -------------



// ------
router.patch('/todos/:id', patchTodo)
router.delete('/todos/:id', deleteTodo)
// ------
router.get('/todos/:id', todoById)
export default router



