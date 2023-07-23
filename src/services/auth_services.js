const jwt = require('jsonwebtoken')

const createToken = (user_id, username) => {
    return jwt.sign(
        {
        user_id: user_id,
        username: username
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn: "1d"}
    )
}

const createStudentToken = (user_id) => {
    return jwt.sign(
        {
        user_id: user_id,
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn: "1d"}
    )
}

const verifyToken = (token) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' })
    }
}

module.exports = {
    createToken,
    verifyToken,
    createStudentToken,
}