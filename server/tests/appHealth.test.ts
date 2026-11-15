import request from 'supertest'
import app from '../src/app'


describe('GET /api/health', () => {
    it('response with 200 OK', async () => {
        const res = await request(app).get('/api/health')

        expect(res.status).toBe(200)
    })
})