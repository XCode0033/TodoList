import request from 'supertest'
import app from '../src/app'
import { pool } from '../src/config/db'


beforeEach(async () => {
    await pool.query(`TRUNCATE users RESTART IDENTITY CASCADE`)
})

afterAll(async () => {
    await pool.end()
})


//helper function
async function loginAs(email: string) {
    const agent = request.agent(app)
    await agent.post('/api/auth/register').send({ email, password: 'Minecraft123' })
    await agent.post('/api/auth/login').send({ email, password: 'Minecraft123' })
    return agent
}


// Problem A.
describe('GET /api/routethatdoesntexist', () => {
    it('responds with a 404 error code', async () => {
        const res = await request(app).get('/api/routethatdoesntexist')

        expect(res.status).toBe(404)
    })
})


// Problem C.
describe('helmet', () => {
    it('sets security headers and hides x-powered-by', async () => {
        const res = await request(app).get('/api/health')
        expect(res.headers['x-content-type-options']).toBe('nosniff')
        expect(res.headers['x-powered-by']).toBeUndefined()
    })
})


//problem 2
describe('POST /api/createTodo with broken JSON', () => {
    it('returns 400 for a broken json body', async () => {
        const res = await request(app)
        .post('/api/createTodo')
        .set('Content-Type', 'application/json')
        .send('{"todo_title": broken')
        expect(res.status).toBe(400)
    })
})


//problem 2a
describe('POST /api/createTodo with no title', () => {
    it('returns 400 due to no title', async () => {
        const alice = await loginAs('alice@gmail.com')

        const res = await alice
        .post('/api/createTodo')
        .set('Content-Type', 'application/json')
        .send('{}')
        expect(res.status).toBe(400)
    })
})
