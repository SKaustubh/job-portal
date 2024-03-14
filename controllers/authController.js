import userModel from "../models/userModel.js"

export const registerController = async(req,res) => {
        try {
            const {name,email,password} =req.body

            //validate
            if(!name){
                return res.status(400 ).send({
                    succes:false,
                    message: 'plz provide name'
                })
            }
            if(!email){
                return res.status(400 ).send({
                    succes:false,
                    message: 'plz provide email'
                })
            }
            if(!password){
                return res.status(400 ).send({
                    succes:false,
                    message: 'plz provide password'
                })
            }
            // if we are creating a user with same email
            const existingUser =await userModel.findOne({email})

            if(existingUser){
                return res.status(200 ).send({
                    succes:false,
                    message: 'user already exists plz login'
                })
            }

            const user =await userModel.create({
                name,
                email,
                password
            })
            res.status(201).send({
                success:true,
                message:'user created',
                user
            });


        } catch (error) {
            console.log(error)
            res.status(400).send({
                message:'error in register controller',
                success:false,
                error
            })
        }
}