import ObjectRepo from '../models/Object-model.js'
import PlayerRepo from '../models/Player-model.js'

// ENDPOINTS
// OBJECT:
// 6. Create object: adds a new object to data source. ✅
// 7. Get object by id: returns the object for the given id. ✅
// 8. Upgrade object: increase/descrease the value of the object given by id
// with a new value ✅
// 9. Destroy object: remove an object from available objects ✅
// BONUS:
// ...
// 10. Repair object ✅
// 11. Delete object completly ✅
//
export async function postObject(req, res) {
    const { body } = req

    try {
        const response = await ObjectRepo.create(body)

        if (!response) return res.status(404).send(response)
        if (response) return res.status(200).send(response)
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}

export async function getObjectById(req, res) {
    const { id } = req.params
    try {
        const response = await ObjectRepo.findById(id)

        if (!response) return res.status(404).send(response)
        if (response) return res.status(200).send(response)
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}

export async function updateObjectValueRandom(req, res) {
    const { id } = req.params
    try {
        const random = Math.floor(Math.random() * (200 - -200) + -200)
        const response = await ObjectRepo.findByIdAndUpdate(
            id,
            {
                value: random,
            },
            { new: true }
        )

        if (!response) return res.status(404).send(response)
        if (response)
            return res.status(200).send({
                response,
                message: `Now ${response.name} has a value of ${response.value}`,
            })
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}

export async function updateObjectByGivenValue(req, res) {
    const { id, value } = req.params
    try {
        if (value > 200 || value < -200)
            return res.status(400).send({
                message: 'Object values can only be between -200 and 200.',
            })
        const response = await ObjectRepo.findByIdAndUpdate(
            id,
            {
                value,
            },
            { new: true }
        )

        if (!response) return res.status(404).send(response)
        if (response)
            return res.status(200).send({
                response,
                message: `Now ${response.name} has a value of ${response.value}`,
            })
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}

export async function destroyObject(req, res) {
    const { id } = req.params

    try {
        const response = await ObjectRepo.findByIdAndUpdate(
            id,
            {
                available: false,
                owner: null,
            },
            { new: true }
        )
        const ownerResponse = await PlayerRepo.findByIdAndUpdate(response._id, {
            $pull: { bag: id },
        })
        if (!ownerResponse) return res.status(404).send(ownerResponse)
        if (!response) return res.status(200).send(response)
        if (response)
            return res
                .status(404)
                .send({ response, message: 'The object was destroyed.' })
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}

export async function repairObject(req, res) {
    const { id } = req.params

    try {
        const response = await ObjectRepo.findByIdAndUpdate(
            id,
            {
                available: true,
            },
            { new: true }
        )
        if (!response) return res.status(404).send(response)
        if (response)
            return res
                .status(200)
                .send({ response, message: 'The object was repaired.' })
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}

export async function deleteObject(req, res) {
    const { id } = req.params

    try {
        const response = await ObjectRepo.findByIdAndRemove(id)
        if (!response) return res.status(404).send(response)
        console.log(response)
        if (response)
            return res
                .status(200)
                .send({ response, message: 'The object was removed.' })
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}
