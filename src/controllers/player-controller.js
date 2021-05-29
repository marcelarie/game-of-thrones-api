import ObjectRepo from '../models/Object-model.js'
import PlayerRepo from '../models/Player-model.js'

// ENDPOINTS
// BONUS:
// 4. Implement attack player endpoint: one player attacks another player using
// an object from its bag. Adjust health accordingly
// 5. Implement steal bag from player endpoint: one player steals everything
// from another player. Bag objects are moved from one player to another.
// 6. Implement resurrect player endpoint: bring back to life a dead player
// using its id.
// 7. Implement use object endpoint: a player use an object against another
// player or itself.
// 8. Are you having fun? You are free to extend the game with new
// functionality.
//EXTRA:

// 1. List all players. ✅
export async function getAllPlayers(req, res) {
    try {
        const response = await PlayerRepo.find({})

        if (!response) return res.status(400).send(response)
        if (response.length <= 0) return res.status(204).send({ data: [] })
        if (response) return res.status(200).send(response)
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}

// 2. Create player: adds a new player to data source. ✅
export async function postPlayer(req, res) {
    const { body } = req

    try {
        const response = await PlayerRepo.create(body)

        if (!response) return res.status(400).send(response)
        if (response) return res.status(200).send(response)
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}

// 3. Get player by id: returns the player for the given id. ✅
export async function getPlayerById(req, res) {
    const { id } = req.params
    try {
        const response = await PlayerRepo.findById(id)

        if (!response) return res.status(404).send(response)
        if (response) return res.status(202).send(response)
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}

// 4. Arm a player with an object in its bag. ✅
export async function addObjectToPlayerByParams(req, res) {
    const { id, objectId } = req.params

    try {
        const objectResponse = await ObjectRepo.findById(objectId)

        if (!objectResponse) return res.status(404).send(objectResponse)
        if (objectResponse.owner)
            return res.status(409).send({
                response: objectResponse,
                message: 'This object already has an owner.',
            })

        const response = await PlayerRepo.findByIdAndUpdate(
            id,
            { $addToSet: { bag: objectResponse._id } },
            { new: true }
        )
        // - Object Ownership ✅
        const ownerObjectResponse = await ObjectRepo.findByIdAndUpdate(
            _id,
            { owner: response._id },
            { new: true }
        )
        if (!ownerObjectResponse)
            return res.status(404).send(ownerObjectResponse)

        if (!response) return res.status(404).send(response)
        if (response) return res.status(202).send(response)
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}

// 4. Arm a player with an object in its bag. ✅
export async function addObjectToPlayer(req, res) {
    const { body } = req

    const { _id, ...rest } = body

    try {
        const objectResponse = await ObjectRepo.findOne(rest)

        if (!objectResponse) return res.status(404).send(objectResponse)
        if (objectResponse.owner)
            return res.status(409).send({
                response: objectResponse,
                message: 'This object already has an owner.',
            })

        const response = await PlayerRepo.findByIdAndUpdate(
            _id,
            { $addToSet: { bag: objectResponse._id } },
            { new: true }
        )
        // - Object Ownership ✅
        const ownerObjectResponse = await ObjectRepo.findByIdAndUpdate(
            _id,
            { owner: response._id },
            { new: true }
        )
        if (!ownerObjectResponse)
            return res.status(404).send(ownerObjectResponse)

        if (!response) return res.status(404).send(response)
        if (response) return res.status(202).send(response)
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}

// 5. Kill a player: sets player health to 0. ✅
export async function killPlayer(req, res) {
    const { id } = req.params
    try {
        const response = await PlayerRepo.findByIdAndUpdate(
            id,
            { health: 0 },
            { new: true }
        )

        if (!response) return res.status(404).send(response)
        if (response) return res.status(202).send(response)
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}

// 3. Implement pick up item endpoint: one player add to its bag one item that
// doesn't belong to any other player.
export async function pickUpObjectWithoutOwener(req, res) {
    const { id } = req.params
    try {
        const objectResponse = await ObjectRepo.findOne({ owner: null })
        if (!objectResponse)
            return res.status(404).send({
                response: objectResponse,
                message: 'Now objects without owner right now.',
            })
        const response = await PlayerRepo.findByIdAndUpdate(
            id,
            { $addToSet: { bag: objectResponse._id } },
            { new: true }
        )
        const ownerObjectResponse = await ObjectRepo.findByIdAndUpdate(
            objectResponse._id,
            { owner: response._id },
            { new: true }
        )
        if (!ownerObjectResponse)
            return res.status(404).send(ownerObjectResponse)

        if (!response) return res.status(404).send(response)
        if (response) return res.status(202).send(response)
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}

// export async function deletePlayer(req, res) {}
