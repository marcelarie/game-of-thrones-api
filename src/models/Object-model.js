import { Schema, model } from 'mongoose'

// { id: 1, name: 'spoon', value: -1 },

const ObjectSchema = Schema({
    _id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
})

const Object = model('object', ObjectSchema)
export default Object
