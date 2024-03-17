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

export const loginController = async (req, res) => {
    const { email, password } = req.body

    // validation
    if (!email || !password) {
        next(`email and password are required`)
    }
    // find user by email
    const user = await userModel.findOne({ email }).select("+password")
    if (!user) {
        next(`Invalid email and password`)
    }

    // compare password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        next(`Invalid email and password`)
    }
    user.password = undefined
    const token = user.createJWT();
    res.status(200).json({
        success: true,
        message: 'Login successful',
        user,
        token,
    })
}