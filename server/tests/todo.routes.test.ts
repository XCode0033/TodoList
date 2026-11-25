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

async function loginAs(email:string) {
    const agent = request.agent(app)
    await agent.post('/api/auth/register').send({email, password: 'Minecraft123'})
    await agent.post('/api/auth/login').send({email, password:'Minecraft123'})
    return agent
}


describe("Users cannot edit or delete each others todos", () => {
    it("Bob cannot PATCH or DELETE Alice's todos.", async() => {
        const alice = await loginAs('alice@gmail.com')
        const bob = await loginAs('bob@gmail.com')

        const aliceTodo = await alice
        .post('/api/createTodo')
        .send({
            todo_title: 'Test todo',
            todo_category: 'Test',
            todo_priority:'high',
            todo_description: 'This is a test todo for the user tests.',
            todo_due_date: '01/01/2026'
        })
        expect(aliceTodo.status).toBe(201)
        const todoId = aliceTodo.body.todo.todo_id

        const aliceList = await alice
        .get('/api/todos')
        expect(aliceList.body).toHaveLength(1)


        const bobsList = await bob
        .get('/api/todos')

        expect(bobsList.status).toBe(200)
        expect(bobsList.body).toEqual([])

        const bobEdit = await bob
        .patch(`/api/todos/${todoId}`)
        .send({
            todo_title: 'ALTERED BY BOB'
        })

        expect(bobEdit.status).toBe(404)

        const aliceAfterEdit = await alice
        .get('/api/todos')
        expect(aliceAfterEdit.status).toBe(200)
        expect(aliceAfterEdit.body[0].todo_title).toBe('Test todo')


        const bobsDeleteAttempt = await bob
        .delete(`/api/todos/${todoId}`)
        expect(bobsDeleteAttempt.status).toBe(404)

        const aliceAfterDelete = await alice
        .get('/api/todos')

        expect(aliceAfterDelete.status).toBe(200)
        expect(aliceAfterDelete.body).toHaveLength(1)
    })
})


describe("Can a user read another's todos", () => {
    it("Bob cannot read alices todo", async() => {
        const alice = await loginAs('alice@gmail.com')
        const bob = await loginAs('bob@gmail.com')
        const aliceTodo = await alice
        .post('/api/createTodo')
        .send({
            todo_title: 'Test todo',
            todo_category: 'Test',
            todo_priority:'high',
            todo_description: 'This is a test todo for the user tests.',
            todo_due_date: '01/01/2026'
        })

        const aliceTodo2 = await alice
        .post('/api/createTodo')
        .send({
            todo_title: 'The second test todo',
            todo_category: 'Test',
            todo_priority:'high',
            todo_description: 'This is another test todo for the user tests but its the second one this time..',
            todo_due_date: '12/7/2028'
        })
        expect(aliceTodo.status).toBe(201)
        expect(aliceTodo2.status).toBe(201)
        const todoId = aliceTodo.body.todo.todo_id

        const aliceList = await alice
        .get('/api/todos')
        expect(aliceList.body).toHaveLength(2)


        const bobsList = await bob
        .get('/api/todos')
        expect(bobsList.status).toBe(200)
        expect(bobsList.body).toEqual([])


        const findById = await bob
        .get(`/api/todos/${todoId}`)

        expect(findById.status).toBe(404)

        // I had misinterpreted the error code 500 thinking something else was wrong, but in reality i was doing :id and not the real id for the route on here.
    })
})

describe('Helper function test to see if it works', () => {
    it('Helper function works', async () => {
        const alice = await loginAs('alice@gmail.com')

        const me = await alice.get('/api/auth/me')

        expect(me.status).toBe(200)
        expect(me.body.user.email).toBe('alice@gmail.com')
    })
})

describe('Post Creation', () => {
    it('User can create posts', async() => {
        const alice = await loginAs('alice@gmail.com')

        const create = await alice
        .post('/api/createTodo')
        .send({
            todo_title: 'Test todo',
            todo_category: 'Test',
            todo_priority:'high',
            todo_description: 'This is a test todo for the user tests.',
            todo_due_date: '01/01/2026'
        })

        expect(create.status).toBe(201)
        expect(create.body.todo).toHaveProperty('user_id')
    })
})

describe("2 person test to see todos", () => {
    it('Bob cannot see alices todos', async() => {

        const alice = await loginAs('alice@gmail.com')
        const bob = await loginAs('bob@gmail.com')

        const create = await alice
        .post('/api/createTodo')
        .send({
            todo_title: 'Test todo',
            todo_category: 'Test',
            todo_priority:'high',
            todo_description: 'This is a test todo for the user tests.',
            todo_due_date: '01/01/2026'
        })
        expect(create.status).toBe(201)


        const canBobSee = await bob
        .get('/api/todos')

        const aliceList = await alice
        .get('/api/todos')
        expect(canBobSee.status).toBe(200)
        expect(canBobSee.body).toEqual([])

        expect(aliceList.body).toHaveLength(1)
    })
})
