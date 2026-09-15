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