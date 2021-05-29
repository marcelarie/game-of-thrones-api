import supertest from 'supertest'

import app from '../server.js'

const api = supertest(app)

test('should return the posted object as json ', async () => {
    await api.post('/object').expect(200).expect('Content-Type', 'application/json')
})
