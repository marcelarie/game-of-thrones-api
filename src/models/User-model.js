import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const { Schema, model } = mongoose

const regexEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const validateEmail = email => regexEmail.test(email)

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
    },
    // maybe I can put here and array if we want the user to have multiple players
    player: {
        type: Number,
        ref: 'player',
    },
})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)

    try {
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        response.json({ message: error })
    }
})

const User = model('user', UserSchema)
export default User
