import mongoose from 'mongoose'
import autoIncrementSchema from '../middlewares/auto-increment'
const { Schema, model } = mongoose

// { id: 1, name: 'spoon', value: -1 },

const ObjectSchema = Schema({
    // _id: {
    //     type: Number,
    //     required: true,
    // },
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
})

autoIncrementSchema(ObjectSchema)

const Object = model('object', ObjectSchema)
export default Object
