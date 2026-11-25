import request, { agent } from 'supertest'
import app from '../src/app'
import { pool } from '../src/config/db'
import { registerSchema,loginSchema } from '../src/schemas/auth.schema'
import passport from 'passport'
import { relative } from 'node:path'

beforeEach(async () => {
    await pool.query(`TRUNCATE users RESTART IDENTITY CASCADE`)
})


afterAll(async () => {
    await pool.end()
})

describe('A request must return 201', () => {
    it('Returns 201', async() => {
        const res = await request(app)
        .post('/api/auth/register')
        .send({ email:'test@gmail.com', password: 'Minecraft123' })

        expect(res.body.user).not.toHaveProperty('hash_password')
        expect(res.status).toBe(201)
        expect(res.body.user.email).toBe('test@gmail.com')
    })
})



describe('Duplication test', () => {
    it('expecting 409 status code from duplication email registering.', async() => {
        const res = await request(app)
        .post('/api/auth/register')
        .send({
            email: 'test@gmail.com',
            password:'NotMinecraft12345'
        })
       const res2 = await request(app)
       .post('/api/auth/register')
       .send({
        email: 'test@gmail.com',
        password: 'NotMinecraft12345'
       })

        expect(res.status).toBe(201)
        expect(res2.status).toBe(409)
        
    })
})


describe('Bad email or short password', () => {
    it.each([
        ['test@gmail.', 8, false], // Should be false because impropoer email
        ['test@gmail.com', 4, false], // Should be false because to little password characters
        ['test@gmail.com', 60, true] // Should be true because proper email and password
    ])('email %s, password length %i -> success %s', (email:string,length:number,expected:boolean) => {
        const password = 'a'.repeat(length)
        const input = {email: email, password}
        const result = registerSchema.safeParse(input)

        expect(result.success).toBe(expected)
    })
})



// ----------
//Login Tests

describe('Login Test for correct password', () => {
    it('Returns 200 for correct login password', async() => {
        // const initialRegister = {email: 'stox03@gmail.com', password:'Minecraft123'}
        // const registerValidate = registerSchema.safeParse(initialRegister)

        // if(registerValidate.success) {
        //     const logIn = registerValidate

        //     expect(logIn).toBe(200)
        // }


        const register = await request(app)
        .post('/api/auth/register')
        .send({email:'stox03@gmail.com', password:'Minecraft123'})

        expect(register.status).toBe(201)

        const login = await request(app)
        .post('/api/auth/login')
        .send({email:'stox03@gmail.com', password:'Minecraft123'})

        expect(login.status).toBe(200)
    })
})



describe('Login test for incorrect password', () => {
    it('Returns 401 for incorrect login password', async() => {
        const register = await request(app)
        .post('/api/auth/register')
        .send({email:'Gilbert@gmail.com', password:'Apples123'})


        expect(register.status).toBe(201)

        const login = await request(app)
        .post('/api/auth/login')
        .send({email:'Gilbert@gmail.com', password:'Twenty-Seven'})

        expect(login.status).toBe(401)

    })
})



describe('Unknown Email test', () => {
    it('Returns 401 for unknown email with message', async() => {
        const register = await request(app)
        .post('/api/auth/register')
        .send({email:'Gilbert@gmail.com', password:'Apples123'})


        expect(register.status).toBe(201)


        const login = await request(app)
        .post('/api/auth/login')
        .send({email:'Gilberry@gmail.com', password:'Apples123'})


        expect(login.status).toBe(401)
        // expect(login.body.error).toBe()
    })
})

describe('Login success AND returns 200', () => {
    it('Achieves login AND returns 200 OK', async() => {
        const register = await request(app)
        .post('/api/auth/register')
        .send({email:'Gilbert@gmail.com', password:'Apples123'})


        expect(register.status).toBe(201)

        const login = await request(app)
        .post('/api/auth/login')
        .send({email:'Gilbert@gmail.com', password:'Apples123'})

        expect(login.status).toBe(200)
    })
})


describe('JSON Token Test', () => {
    it('Successful login sends JSON Token', async() => {
        const register = await request(app)
        .post('/api/auth/register')
        .send({email:'Gilbert@gmail.com', password:'Apples123'})


        expect(register.status).toBe(201)

        const login = await request(app)
        .post('/api/auth/login')
        .send({email:'Gilbert@gmail.com', password:'Apples123'})

        expect(login.status).toBe(200)
        expect(login.body.token).toBeDefined()
        const cookies = login.headers['set-cookie']
        expect(cookies).toBeDefined()
        expect(cookies![0]).toContain('HttpOnly')


    })
})


describe('Returning user when logged in.', () => {
    it('/me returns the user when logged in', async() => {
        const agent = request.agent(app)
    
       
        await agent
        .post('/api/auth/register')
        .send({email:'me@example.com', password: 'Minecraft123'})
    
        await agent
        .post('/api/auth/login')
        .send({email:'me@example.com', password: 'Minecraft123'})
        const res = await agent.get('/api/auth/me')
    
        expect(res.status).toBe(200)
    
        expect(res.body.user.email).toBe('me@example.com')
    
        expect(res.body.user).not.toHaveProperty('hash_password')
        
    
    
    })

})
describe('test', () => {
    it('/me returns 401 with no login', async() => {
        const res = await request(app).get('/api/auth/me')
        expect(res.status).toBe(401)
    })

})



describe('Native path. A token sent in a header and no cookie is accepted by /me', () => {
    it('/me Successfully accepts a header token with no cookie', async() => {
        const register = await request(app)
        .post('/api/auth/register')
        .send({email:'me@example.com', password: 'Minecraft123'})

        expect(register.status).toBe(201) 

        const login = await request(app)
        .post('/api/auth/login')
        .send({email:'me@example.com', password:'Minecraft123'})

        expect(login.status).toBe(200)

        const token = login.body.token

        const me = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)

        expect(me.status).toBe(200)
        expect(me.body.user.email).toBe('me@example.com')
    })
})


describe('Testing logout feature', () => {
    it('Retrieves token and logs user out with 200', async() => {
        const agent = request.agent(app)
        
        await agent
        .post('/api/auth/register')
        .send({email:'me@example.com', password: 'Minecraft123'})
        
        await agent
        .post('/api/auth/login')
        .send({email:'me@example.com', password: 'Minecraft123'})

        const login = await agent.get('/api/auth/me')
        expect(login.status).toBe(200)

        const logout = await agent.post('/api/auth/logout')
        expect(logout.status).toBe(200)

        const me = await agent.get('/api/auth/me')
        expect(me.status).toBe(401)
        
    })
})