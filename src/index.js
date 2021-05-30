import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

import app from './server.js'

const { NODE_ENV, DB_CONNECT } = process.env

const PORT = process.env.PORT || 8080

mongoose.connect(
    DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    () => console.log('Connected to Database')
)

mongoose.set('returnOriginal', false)

export { app }

if (NODE_ENV !== 'test')
    app.listen(PORT, () => console.log(`Server running on port ${PORT} :)`))
