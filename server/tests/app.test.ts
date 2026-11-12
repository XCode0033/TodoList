import request from 'supertest'
import app from '../src/app'
import { METHODS } from 'http'

describe.skip('GET /api/createPage', () => {
    it.skip('responds with 200 and a message', async () => {
        const res = await request(app).get('/api/createPage')

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('message')
    
    })
})


// Problem A.
describe.skip('GET /api/routethatdoesntexist', () => {
    it.skip('responds with a 404 error code', async () => {
        const res = await request(app).get('/api/routethatdoesntexist')

        expect(res.status).toBe(404)

    })
})


describe.skip('GET /api/createPage (details)', () => {
    it.skip('has a JSON response', async () => {
        const res = await request(app).get('/api/createPage')

        expect(res.headers['content-type']).toMatch(/json/)
        expect(typeof res.body.message).toBe('string')
        expect(res.body).toEqual({message: "This is where you'll create the todo."})
    })
})



// Problem C.
describe.skip('helmet', () => {
    it.skip('sets security headers and hides x-powered-by', async () => {
        const res = await request(app).get('/api/createPage')
        expect(res.headers['x-content-type-options']).toBe('nosniff')
        expect(res.headers['x-powered-by']).toBeUndefined()
    })
})


//Problem E
describe.skip('POST /api/createPage', () => {
    it.skip('POST for createPage does not exist.', async () => {
        const res =  await request(app).post('/api/createPage')

        expect(res.status).toBe(404)
    })
})



//problem 1
describe.skip('wrong methods on /api/createPage', () => {
  it.each(['post', 'put', 'patch', 'delete'] as const)(
    '%s returns 404',
    async (method) => {
      const res = await request(app)[method]('/api/createPage')
      expect(res.status).toBe(404)
    },
  )
})


//problem 2
describe.skip('POST /api/createTodo', () => {
    it('getting a broken json body and returning a 404', async() => {
        const res = await request(app)
        .post('/api/createTodo')
        .set('Content-Type', 'application/json')
        .send('{"todo_title": broken')
        expect(res.status).toBe(400)
    })
})


//problem 2a
describe.skip('POST /api/createTodo', () => {
    it('/api/createTodo should return 400 due to no title', async() => {
        const res = await request(app)
        .post('/api/createTodo')
        .set('Content-Type', 'application/json')
        .send('{}')
        expect(res.status).toBe(400)

        
    })
})



