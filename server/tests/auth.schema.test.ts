
import { registerSchema, loginSchema} from "../src/schemas/auth.schema";

describe('Valid register input', () => {
    it('Email returns trimmed and lowercase.', () => {
        const input = {email: ' Test@Example.COM', password: 'Minecraft123'}
        const result = registerSchema.safeParse(input)

        expect(result.success).toBe(true)
        if(result.success) {
            expect(result.data).toEqual({
                email: 'test@example.com',
                password: 'Minecraft123'
            })
        }

    })
})


describe('Invalid register email', () => {
    it.each([
        'nope',
        'thIs$sometimes.net',
        '',
        'com.liamg@30xots'
    ])('rejects email %j', (badEmail:string) => {
        const input = {email: badEmail, password: 'Minecraft123' }
        const result = registerSchema.safeParse(input)

        expect(result.success).toBe(false)
    })
})


describe('Character length test', () => {
    it('Rejects password of length >72 ', () => {
        const input = {email: 'stox03@gmail.com', password: 'a'.repeat(73)}
        const result = registerSchema.safeParse(input)
        
        expect(result.success).toBe(false)
       
       
        
    })
})


describe('Character length test NUMBER 2', () => {
    it.each([
        [72, true],
        [46, true],
        [8, true],
        [7, false],
        [3, false],
        [73, false],
    ])('Password of %i characters -> success %s', (length:number, expected: boolean) => {
        const password = 'a'.repeat(length)
        const input = {email: 'test@gmail.com', password}
        const result = registerSchema.safeParse(input)

        expect(result.success).toBe(expected)
    })
})

