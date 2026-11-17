import { z } from 'zod'

export const contactSchema = z.object({
    email: z.email().toLowerCase(),
    message: z.string().min(1).max(500),

})


export const registerSchema = z.object({
    email: 
    z.string()
    .toLowerCase()
    .trim()
    .max(255)
    .pipe(z.email('Please enter a valid email')),

    password: 
    z.string('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be 72 characters or fewer.')
})


export const loginSchema = z.object({
    email:
    z.string()
    .toLowerCase()
    .trim()
    .max(255)
    .pipe(z.email('Please enter a valid email')),

    password:
    z.string('Password is required').min(1)
})