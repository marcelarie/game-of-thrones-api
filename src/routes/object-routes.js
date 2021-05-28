import { Router } from 'express'
import * as ObjectMethods from '../controllers/object-controller.js'

const ObjectRouter = Router()

ObjectRouter.post('', ObjectMethods.postObject)

export default ObjectRouter
