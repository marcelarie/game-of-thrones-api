import ObjectRepo from '../models/Object-model.js'

// ENDPOINTS
//OBJECT:
// 6. Create object: adds a new object to data source. ✅
// 7. Get object by id: returns the object for the given id.
// 8. Upgrade object: increase/descrease the value of the object given by id with a new value
// 9. Destroy object: remove an object from available objects
// BONUS:
// ...
//
export async function postObject(req, res) {
    const { body } = req

    try {
        const response = await ObjectRepo.create(body)

        if (!response) return res.status(400).send(response)
        if (response) return res.status(200).send(response)
    } catch ({ message }) {
        res.status(500).send({ message })
    }
}
