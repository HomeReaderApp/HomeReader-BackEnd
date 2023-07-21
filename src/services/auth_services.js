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

module.exports = {createToken}