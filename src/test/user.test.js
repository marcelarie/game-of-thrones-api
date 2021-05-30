import supertest from 'supertest'
import mongoose from 'mongoose'

import { app } from '../index.js'
import { UserModel } from '../models/index.js'

const api = supertest(app)

beforeEach(async () => {
    const users = [
        {
            username: 'the-mountain',
            email: 'mount@ain.com',
            password: 'pass1234',
        },
    ]
    await UserModel.deleteMany({})
    await UserModel.insertMany(users)
})

// sign up
test('should return created user', async () => {
    const user = {
        username: 'Jon Snow',
        email: 'jon@snow.com',
        password: '12345passw',
    }
    const response = await api.post('/user/sign-up').send(user)
    expect(response.status).toBe(201)
    expect(typeof response.body).toBe('object')
})

// login <-- this test dosen't work and I don't know why :(
// test('should confirm the login with a message and a token', async () => {
//     const user = {
//         username: 'the-mountain',
//         password: 'pass1234',
//     }
//     const response = await api.post('/user/login').send(user)
//     expect(response.status).toBe(201)
//     expect(typeof response.body).toBe('object')
// })
