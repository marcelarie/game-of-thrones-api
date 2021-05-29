import UserRepo from '../models/User-model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function singUp(req, res) {
    const { body } = req
    try {
        const response = await UserRepo.create(body)
        if (!response) res.status(400).json(response)
        if (response) res.status(200).json(response)
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}

export async function login(req, res) {
    const { body } = req
    try {
        const user = await UserRepo.findOne({ username: body.username })
        const passwordCheck = await bcrypt.compare(body.password, user.password)

        if (!passwordCheck)
            res.status(401).send({
                message: 'Username or password are incorrect',
            })

        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 86400,
        })

        res.cookie('token', token, { httpOnly: true })
        if (passwordCheck) res.status(200).send({ message: 'Logged In' })
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}
