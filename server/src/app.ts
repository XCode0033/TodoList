import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import express from 'express'
import helmet from 'helmet'
import './config/passport'
import indexRouter from './routes/index.route'

const app = express()


app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())

app.use('/api', indexRouter)


export default app