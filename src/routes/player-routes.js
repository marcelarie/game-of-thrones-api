import { Router } from 'express'
import * as PlayerMethods from '../controllers/player-controller.js'

const PlayerRouter = Router()

PlayerRouter.get('/all', PlayerMethods.getAllPlayers)
PlayerRouter.get('/:id', PlayerMethods.getPlayerById)
PlayerRouter.post('', PlayerMethods.postPlayer)
PlayerRouter.patch('/add-object', PlayerMethods.addObjectToPlayer)
PlayerRouter.patch(
    '/add-object/:objectId/to/:id',
    PlayerMethods.addObjectToPlayerByParams
)
PlayerRouter.patch('/kill/:id', PlayerMethods.killPlayer)
PlayerRouter.patch('/pick-up-object/:id', PlayerMethods.pickUpObjectWithoutOwener)
PlayerRouter.patch('/:id/steal/:victim', PlayerMethods.stealFromPlayer)
PlayerRouter.patch('/resurrect/:id', PlayerMethods.resurrectPlayer)
// this two endpoints do the same ↴
PlayerRouter.patch('/attack', PlayerMethods.attackPlayer)
PlayerRouter.patch('/use-object', PlayerMethods.attackPlayer)

export default PlayerRouter
