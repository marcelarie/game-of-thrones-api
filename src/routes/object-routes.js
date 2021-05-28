import { Router } from 'express'
import * as ObjectMethods from '../controllers/object-controller.js'

const ObjectRouter = Router()

ObjectRouter.post('', ObjectMethods.postObject)
ObjectRouter.get('/:id', ObjectMethods.getObjectById)
ObjectRouter.put('/value-random/:id', ObjectMethods.updateObjectValueRandom)
ObjectRouter.put('/value/:value/to/:id', ObjectMethods.updateObjectByGivenValue)

export default ObjectRouter
