import jwt from 'jsonwebtoken'

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.substring(7)
        console.log(token)

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res
                    .status(401)
                    .send({ message: 'Token not authorized.' })
            }

            // still don't understand this part
            req.user = user
            next()
        })
    } else {
        res.status(401).send({ message: 'Token not authorized.' })
    }
}

export default authMiddleware
