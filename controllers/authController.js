import userModel from "../models/userModel.js"

export const registerController = async (req, res,next) => {

    const { name, email, password } = req.body

    //validate
    if (!name) {
       next(`name is required`)
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
    res.status(201).send({
        success: true,
        message: 'user created',
        user,
    });



    next(error);
 

}