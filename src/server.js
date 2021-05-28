import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(morgan())
app.use(express.json())
app.use(cors())

export default app
