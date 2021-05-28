import mongoose from 'mongoose'
const { Schema, model } = mongoose

// { id: 1, name: 'Jon Snow', age: 23, health: 100, bag: [1] },

const PlayerSchema = Schema({
    // _id: {
    //     type: Number,
    //     required: true,
    // },
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

const Player = model('player', PlayerSchema)
export default Player
