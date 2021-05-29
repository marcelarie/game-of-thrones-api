export default function autoIncrementSchema(schema) {
    schema.pre('validate', async function () {
        const constructor = await this.constructor.find({})
        const collectionLength = constructor.length
        this._id = collectionLength + 1
    })
}
