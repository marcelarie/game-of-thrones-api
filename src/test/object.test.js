import supertest from 'supertest'

import { app } from '../index.js'

const api = supertest(app)

test('should return the posted object as json ', async () => {
    await api
        .post('/object')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('should return the found object by id as json', async () => {
    const response = await api.get('/object/2')
    expect(response.status).toBe(202)
})
