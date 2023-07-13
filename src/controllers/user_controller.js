const getUsers = async (request, response) => {
    users = await User.find()
    response.json({
        "users": users
    })
}

const userRegister = async (request, response) => {
    response.json({
        "user": {
            "username": request.body.username,
            "password": request.body.password,
            "school": request.body.school
        } 
    })
}



module.exports = {
    getUsers,
    userRegister
}