import { Router } from 'express'
import * as UserMethods from '../controllers/user-controller.js'

const UserRouter = Router()

UserRouter.post('/sign-up', UserMethods.singUp)

export default UserRouter
