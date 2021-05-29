import { Router } from 'express'
const router = Router()

router.get('/health', function (req, res) {
    res.body = 'Up and running'
    // QUESTION: why this endpoint blocks the app?
    // RESPONSE: because dons't have a response
})

module.exports = router
