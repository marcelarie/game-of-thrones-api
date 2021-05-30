import supertest from 'supertest'
import mongoose from 'mongoose'

import { app } from '../index.js'
import { ObjectModel } from '../models/index.js'

const api = supertest(app)

beforeEach(async () => {
    const objects = [{ name: 'Knife', value: -20 }]
    await ObjectModel.deleteMany({})
    await ObjectModel.insertMany(objects)
})

// Test a get request
test('should return the found object by id as json', async () => {
    const response = await api.get('/object/1')
    expect(response.status).toBe(200)
    expect(typeof response.body).toBe('object')
})

// Test a post request for a new object
test('should return the posted object as json ', async () => {
    const object = {
        name: 'Sword',
        value: 100,
    }
    await api
        .post('/object')
        .send(object)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

// Test model validation
test('should have name and value (min: -200, max: 200)', async () => {
    const object = {
        name: 'Knife',
        value: 250,
        other: false, // <- this field dosn't exist on the model
    }
    await api
        .post('/object')
        .send(object)
        .expect(500)
        .expect('Content-Type', /application\/json/)
})
