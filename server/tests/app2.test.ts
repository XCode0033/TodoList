import app from "../src/app";
import request from "supertest";


// // describe('CORS header test', () => {
// //     it('appears on a cross-origin GET', async() => {
// //         const res = await request(app).get('/api/todos')
// //         .set('Origin', 'http://example.com')
// //         .set('accesss-control-allow-origin', '*')
// //     })
// // })



// //problem 3 i dont know what this is or where to start or what im targeting
// // describe('HEAD request', () => {
// //     it('returns 200 with no body', () => {
// //         co
// //     })
// // })


// //problem 4, WORKS
// describe.skip('Trailing slash test', () => { 
//     it('A trailing slash still works', async () => {
//         const res = await request(app).get('/api/createPage/')

//         expect(res.status).toBe(200)
//     })
// })

// //problem 5, WORKS
// describe.skip('Impropoer casing', () => { 
//     it('Improper casing still works fine', async() => {
//         const res = await request(app).get('/api/CREATEPAGE')

//         expect(res.status).toBe(200)
//     })
// })


// //problem 6 //HAVING FOO BAR BREAKS THE URL, WORKS
// describe.skip('URL having foo aded doesnt do anything', () => {
//     it('ignores unknown query strings', async() => {
//         const plain = await request(app.get('/api/createPage')) // my version didn't have this, wahts this for? 
//         const res = await request(app).get('/api/createPage').query({foo: 'bar'}) // my version onlu had this but it still shows green
//         expect(res.status).toBe(200)

//     })
// })


// //problem 7 WORKS, you didn't specify the extra 'toContain' part for res.text
// describe.skip('Seeing if the HTML is containing cannot GET /api/nope', () => {
//     it('Contains cannot get /api/nope', async() => {
//         const res = await request(app).get('/api/nope')

//         expect(res.status).toBe(404)
//         expect(res.text).toContain('Cannot GET /api/nope')
//     })
// })


// //problem 8

// // it.each(['/', '/api'])('%s has no route', async(path) => {
// //     const res = await request(app).get(path)
// //     expect(res.status).toBe(404)
// // })

// // problem 9





// //problem 10



// // problem 1 of '10 tests'

// it.skip('Does have a header', async() => {
//         const res = await request(app).get('/api/createPage')

//         expect(res.headers['strict-transport-security']).toMatch(/max-age=\d+/)
//     })




// //problem 2

// describe.skip('test test', () => {
//     it.each([
//     ['x-dns-prefetch-control', 'off'],
//     ['referrer-policy', 'no-referrer'],
//     ['cross-origin-opener-policy', 'same-origin'],
// ])('sets %s to %s', async (header, value) => {
//     const res = await request(app).get('/api/createPage')
//     expect(res.headers[header]).toBe(value)
// })
// })



// it('handles 20 requests at once', async () => {
//   const results = await Promise.all(
//     Array.from({ length: 20 }, () => request(app).get('/api/createPage')),
//   )
//   expect(results.every((r) => r.status === 200)).toBe(true)
// })


//test 1
describe.skip('Paths that return 200', () => {
   it.each(['/api/createPage', '/api/createPage/', '/api/CREATEPAGE'])('% returns 200', async(path) => {
    const res = await request(app).get(path)
    expect(res.status).toBe(200)
   })
})


//test 2
describe.skip('Paths that return 404', () => {
    it.each(['/', '/api', '/api//createPage', '/api/nope', '/api/createPage/extra'])('%s returns 404', async(path) => {
        const res = await request(app).get(path)
        expect(res.status).toBe(404)
    })
})

//3
describe.skip('Bodies that return 400', () => {
    it.each(['{', '{"title":}', 'not json', '123', '"hello"'])
    (
        'body %s returns 400',
        async (body) => {
            const res = await request(app)
            .post('/api/createTodo')
            .set('Content-Type', 'application/json')
            .send(body)
            expect(res.status).toBe(400)
        }
    )
})


//4 
describe('Method, path, and expected status', () => {
    const rows: Array<['get' | 'post' | 'delete' | 'put', string, number]> = [
        ['get', '/api/createPage', 200],
        ['post', '/api/createPage', 404],
        ['put', '/api/nope', 404],
        ['delete', '/api/createPage', 404]

    ]

    it.each(rows)('%s %s returns %i', async (method, path, status) => {
        const res = await request(app)[method](path)
            expect(res.status).toBe(status)
        
    })
})