import app from "../src/app";
import { createTodoSchema } from "../src/schemas/todo.schema";

describe.skip('createTodoSchema', () => {
    it('accepts a valid todo', () => {
        const result = createTodoSchema.safeParse({
            todo_title: 'Buy milk',
            todo_priority: 'high',
        })

        expect(result.success).toBe(true)
    })

    it('keeps the title unchanged', () => {
        const result = createTodoSchema.safeParse({todo_title: 'Buy milk'})
        expect(result.success).toBe(true)
        if(result.success) {
            expect(result.data.todo_title).toBe('Buy milk')
        }
    })

    it.each(['low', 'medium', 'high'])('accepts priority "%s', (priority) => {
        const result = createTodoSchema.safeParse({
            todo_title: 'x',
            todo_priority: priority
        })

        expect(result.success).toBe(true)
    })
})