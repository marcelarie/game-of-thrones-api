import mongoose from 'mongoose'
import autoIncrementSchema from '../middlewares/auto-increment.js'
const { Schema, model } = mongoose

// { id: 1, name: 'Jon Snow', age: 23, health: 100, bag: [1] },

const PlayerSchema = Schema({
    _id: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    health: {
        type: Number,
        default: 100,
    },
    bag: [
        {
            type: Number,
            ref: 'object',
        },
    ],
})

autoIncrementSchema(PlayerSchema)

const Player = model('player', PlayerSchema)
export default Player
