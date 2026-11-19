import dotenv from 'dotenv'

dotenv.config({path: '.env.test'})

if(!process.env.DATABASE_URL?.includes('test')) {
    throw new Error('Refusing to run tests against a non-test database.')
}