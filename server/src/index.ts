import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'

import './config/passport'
import indexRouter from './routes/index.route'

const app = express()
const PORT = process.env.PORT || 8003

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())

app.use('/api', indexRouter)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
