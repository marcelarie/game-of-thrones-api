import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import authMiddleware from './middlewares/auth-middleware.js'
import { ObjectRouter, PlayerRouter, UserRouter } from './routes/index.js'
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.disable('x-powered-by') // QUESTION: any reason is this line here?
// RESPONSE: It can give information to hackers about the type of server we have
//

app.use('/user', UserRouter)
// app.use(authMiddleware) // <--- comment/disable this if you want to try the endpoints without authentiaction
app.use('/player', PlayerRouter)
app.use('/object', ObjectRouter)

export default app
