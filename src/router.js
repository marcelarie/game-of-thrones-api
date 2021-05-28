const { Router } = require('express')
import { Router } from 'express'
const router = Router()

router.get('/health', function (req, res) {
    res.body = 'Up and running'
    // QUESTION: why this endpoint blocks the app?
})

module.exports = router
