import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

import app from './server.js'

const PORT = process.env.PORT || 8080

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
    },
    () => {
        console.log('Connected to Database')
    }
)
        mongoose.set('returnOriginal', false)

app.listen(PORT, () => console.log(`Server running on port ${PORT} :)`))
