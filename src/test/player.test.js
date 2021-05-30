import supertest from 'supertest'

import { app } from '../index.js'
import { PlayerModel } from '../models/index.js'

const api = supertest(app)

// 1. Verify correct HTTP status code
// 2. Verify response payload
// 3. Verify response headers
// 4. Verify correct application state
// 5. Verify basic performance sanity

beforeEach(async () => {
    const players = [{ name: 'Jon Snow', age: 23, health: 100, bag: [1] }]
    await PlayerModel.deleteMany({})
    await PlayerModel.insertMany(players)
})

// get all players
test('should return the an array of players as json', async () => {
    const response = await api.get('/player/all')
    expect(response.status).toBe(200)
    expect(typeof response.body).toBe('object')
})

// post a player
test('should return the posted player', async () => {
    const player = {
        name: 'Aria',
        age: 15,
        health: 100,
        bag: [1],
    }
    const response = await api.post('/player').send(player)
    expect(response.status).toBe(201)
    expect(typeof response.body).toBe('object')
})

// Kill a player: sets player health to 0.
test('should return the choosen player with health 0', async () => {
    const response = await api.put('/player/kill/1')
    expect(response.status).toBe(202)
    expect(typeof response.body).toBe('object')
    expect(response.body.response.health).toBe(0)
})
