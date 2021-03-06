import mongoose from 'mongoose'
import autoIncrementSchema from '../middlewares/auto-increment.js'
const { Schema, model } = mongoose

// { id: 1, name: 'spoon', value: -1 },

const ObjectSchema = Schema({
    _id: {
        type: Number,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    value: {
        type: Number,
        default: Math.floor(Math.random() * (200 - -200) + -200),
        max: 200,
        min: -200,
    },
    available: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: Number,
        ref: 'player',
        default: null,
    },
})

autoIncrementSchema(ObjectSchema)

const Object = model('object', ObjectSchema)
export default Object
