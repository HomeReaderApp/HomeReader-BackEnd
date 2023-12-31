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

const createStudentToken = (user_id, firstName) => {
    return jwt.sign(
        {
        user_id: user_id,
        firstName: firstName
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn: "1d"}
    )
}

const verifyToken = (token, response) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (error) {
        response.status(401).json({ error: 'Invalid token' })
    }
}

module.exports = {
    createToken,
    verifyToken,
    createStudentToken,
}