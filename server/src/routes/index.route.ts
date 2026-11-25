import { Router } from 'express'
import {deleteTodo, getCreateTodoPage, getTodos, patchTodo, postTodo, todoById, register, login, findMe, logout, } from '../controllers/todo.controller'
import { validateBody } from '../middleware/validate'
import { getCalendar } from '../controllers/calendarController'
import { createTodoSchema } from '../schemas/todo.schema'
import { loginSchema, registerSchema } from '../schemas/auth.schema'

import { tokenVerify } from '../middleware/requireAuth'

const router = Router()

router.get('/health', (req, res) => {
    res.json({status: 'ok'})
})
router.get("/todos", (tokenVerify), getTodos)
router.get("/createPage", (tokenVerify), getCreateTodoPage)
router.get("/calendar", (tokenVerify), getCalendar)
router.get('/auth/me', (tokenVerify), findMe)

// -------------
router.post('/createTodo', (tokenVerify), validateBody(createTodoSchema), postTodo)
router.post('/auth/register', validateBody(registerSchema), register)
router.post('/auth/login', validateBody(loginSchema), login)
router.post('/auth/logout', logout)
// -------------



// ------
router.patch('/todos/:id', (tokenVerify), patchTodo)
router.delete('/todos/:id', (tokenVerify), deleteTodo)
// ------
router.get('/todos/:id', (tokenVerify), todoById)
export default router




