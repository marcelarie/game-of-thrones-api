import { Router } from 'express'
import * as ObjectMethods from '../controllers/object-controller.js'

const ObjectRouter = Router()

ObjectRouter.post('', ObjectMethods.postObject)
ObjectRouter.get('/:id', ObjectMethods.getObjectById)
ObjectRouter.patch('/value-random/:id', ObjectMethods.updateObjectValueRandom)
ObjectRouter.patch('/value/:value/to/:id', ObjectMethods.updateObjectByGivenValue)
ObjectRouter.patch('/destroy/:id', ObjectMethods.destroyObject)
ObjectRouter.patch('/repair/:id', ObjectMethods.repairObject)
ObjectRouter.delete('/:id', ObjectMethods.deleteObject)

export default ObjectRouter
