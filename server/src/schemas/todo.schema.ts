import { z } from 'zod'

export const todoPriority = z.enum(['low', 'medium', 'high'])

export const createTodoSchema = z.object({
  todo_title: z.string().min(1).max(255),
  todo_category: z.string().max(100).optional(),
  todo_priority: todoPriority.optional(),
  todo_description: z.string().optional(),
  todo_due_date: z.coerce.date().optional(),
})

export type CreateTodoInput = z.infer<typeof createTodoSchema>
