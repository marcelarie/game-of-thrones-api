import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { PlayerRouter } from './routes/index.js'
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
// app.disable("x-powered-by"); // QUESTION: any reason is this line here?

app.use('/player', PlayerRouter)

export default app
