import UserRepo from '../models/User-model.js'

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
