import 'express'
import { RequestHandler } from 'express'

import { pool } from '../config/db'
export const getTodos:RequestHandler = async(req, res) => {
    const result = await pool.query(
        `
        SELECT * FROM todo ORDER BY todo_id ASC
        `
    )
    res.json(result.rows)
}


export const getCreateTodoPage:RequestHandler = async(req, res) => {
    res.status(200).json({
        message: 'This is where you will create the todo'
    })
    console.log(`Create Todo page accessed!`)
}
export const postTodo:RequestHandler = async(req, res) => {
    const {todo_title, todo_category, todo_priority, todo_description, todo_due_date} = req.body;

    const result = await pool.query(
        `
        INSERT INTO todo(todo_title, todo_category, todo_priority, todo_description, todo_due_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `, [todo_title, todo_category, todo_priority, todo_description, todo_due_date]
    );

    
    
    res.status(200).json({todo: result.rows[0]})
    console.log('Todo created!')

}

export const deleteTodo:RequestHandler = async(req, res) => {
    const { id } = req.params;

    const result = await pool.query(
        `
        DELETE FROM todo
        WHERE todo_id = $1
        RETURNING*
        `, [id]
    );

    if(result.rowCount === 0) {
        console.log(`No todo with that id found`)
        return res.status(404)
    }

    res.status(200).json({todo: result.rows[0]})
    console.log('Todo deleted successfully!')
}



