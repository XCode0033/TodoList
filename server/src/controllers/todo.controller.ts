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

export const todoById:RequestHandler = async(req, res) => {
    const { id } = req.params;

    const result = await pool.query(
        `
        SELECT * FROM todo 
        WHERE todo_id = $1
       
        `,[id]
    );

    if(result.rows.length === 0) {
        console.log('Could not find by id')
    }
    res.status(200).json({todo: result.rows[0]})
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

export const patchTodo:RequestHandler = async(req, res) => {
    const { id } = req.params;
    const { todo_title, todo_category, todo_description, todo_priority, todo_due_date, todo_completed} = req.body

    const result = await pool.query(`
        UPDATE todo
        SET
        todo_title = COALESCE($1, todo_title),
        todo_category = COALESCE($2, todo_category),
        todo_description = COALESCE($3, todo_description),
        todo_priority = COALESCE($4, todo_priority),
        todo_due_date = COALESCE($5, todo_due_date),
        todo_completed = COALESCE($6, todo_completed),
        updated_at = now()
        WHERE todo_id = $7
        RETURNING*
        `, [todo_title, todo_category, todo_description, todo_priority, todo_due_date, todo_completed, id])

    if(result.rowCount === 0) {
        return res.status(404).json({ message: 'No todo with that id found' })
    }

    res.status(200).json({ todo: result.rows[0] })
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



