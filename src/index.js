import dotenv from 'dotenv'
import mongoose from 'mongoose'

import app from './server.js'

dotenv.config()

const PORT = process.env.PORT || 8080

export function connect() {
    mongoose.connect(
        process.env.DB_CONNECT,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        },
        () => console.log('Connected to Database')
    )
}
connect()

app.listen(PORT, () => console.log(`Server running on port ${PORT} :)`))
