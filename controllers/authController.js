import userModel from "../models/userModel.js"
import colors from 'colors'

export const registerController = async (req, res, next) => {

    const { name, email, password } = req.body

    //validate
    if (!name) {
        next(`name is required `)
    }
    if (!email) {
        next(`email is required`)
    }
    if (!password) {
        next(`password is required`)
    }
    // if we are creating a user with same email
    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
        next(`user with this email already exists`)
    }

    const user = await userModel.create({
        name,
        email,
        password
    })

    //token
    const token = user.createJWT();
    res.status(201).send({
        success: true,
        message: 'user created',
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location
        },
        token

    });
}