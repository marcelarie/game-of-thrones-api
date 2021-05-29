import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import authMiddleware from './middlewares/auth-middleware.js'
import { ObjectRouter, PlayerRouter, UserRouter } from './routes/index.js'
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
// app.disable("x-powered-by"); // QUESTION: any reason is this line here?

app.use('/user', UserRouter)
app.use(authMiddleware)
app.use('/player', PlayerRouter)
app.use('/object', ObjectRouter)

export default app
