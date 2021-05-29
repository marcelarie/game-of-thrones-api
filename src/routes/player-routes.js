import { Router } from 'express'
import * as PlayerMethods from '../controllers/player-controller.js'

const PlayerRouter = Router()

PlayerRouter.get('/all', PlayerMethods.getAllPlayers)
PlayerRouter.get('/:id', PlayerMethods.getPlayerById)
PlayerRouter.post('', PlayerMethods.postPlayer)
PlayerRouter.patch('/add-object', PlayerMethods.addObjectToPlayer)
PlayerRouter.put(
    '/add-object/:objectId/to/:id',
    PlayerMethods.addObjectToPlayerByParams
)
PlayerRouter.put('/kill/:id', PlayerMethods.killPlayer)
PlayerRouter.put('/pick-up-object/:id', PlayerMethods.pickUpObjectWithoutOwener)
PlayerRouter.patch('/attack', PlayerMethods.attackPlayer)

export default PlayerRouter
