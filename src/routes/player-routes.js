import { Router } from 'express'
import * as PlayerMethods from '../controllers/player-controller.js'

const PlayerRouter = Router()

PlayerRouter.get('/all', PlayerMethods.getAllPlayers)
PlayerRouter.get('/:id', PlayerMethods.getPlayerById)
PlayerRouter.post('', PlayerMethods.postPlayer)

export default PlayerRouter
