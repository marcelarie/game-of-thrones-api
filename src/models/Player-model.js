import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'
import { connect } from '../index.js'
const { Schema, model } = mongoose

// { id: 1, name: 'Jon Snow', age: 23, health: 100, bag: [1] },

autoIncrement.initialize(connect)

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
        required: true,
    },
    bag: [
        {
            type: Number,
            ref: 'object',
        },
    ],
})

PlayerSchema.plugin(autoIncrement.plugin, 'player')

const Player = model('player', PlayerSchema)
export default Player
