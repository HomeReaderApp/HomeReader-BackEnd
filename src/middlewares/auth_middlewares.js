
const { verifyToken } = require('../services/auth_services')

const validateRequest = (request, response, next) => {
    console.log(request.headers)
    try {
        if(request.headers.authorization){
            const token = request.headers.authorization.split(" ")[1]
            if (!token){
                throw new Error ("A token is required for authentication")
            }
            const decoded = verifyToken(token)
            request.user = decoded
            return next()
        } else {
            throw new Error ("Not authenticated for this action")
        }
        return next()
    } catch (error) {
        next(error)
    }
}

module.exports = validateRequest
