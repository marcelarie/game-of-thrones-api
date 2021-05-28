import { Router } from 'express'
import * as ObjectMethods from '../controllers/object-controller.js'

const ObjectRouter = Router()

ObjectRouter.post('', ObjectMethods.postObject)
ObjectRouter.get('/:id', ObjectMethods.getObjectById)
ObjectRouter.put('/value-random/:id', ObjectMethods.updateObjectValueRandom)
ObjectRouter.put('/value/:value/to/:id', ObjectMethods.updateObjectByGivenValue)
ObjectRouter.put('/destroy/:id', ObjectMethods.destroyObject)
ObjectRouter.put('/repair/:id', ObjectMethods.repairObject)
ObjectRouter.delete('/:id', ObjectMethods.deleteObject)

export default ObjectRouter
