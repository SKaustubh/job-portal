import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
//schema

const userSchema = new mongoose.Schema({
        name:{
            type: 'string',
            required:[true,'Name is required']
        },
        email:{
            type: 'string',
            required:[true,'Email is required'],
            unique:true,
            validate:validator.isEmail
        },
        password:{
            type: 'string',
            required:[true,'Password is required'],
            minlength:[6,'password must be at least 6 characters']
        },
        lastName:{
            type: 'string',
           
        },
        location:{
            type: 'string',
            default: 'India'
        }
},{timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}})


//middlewares
userSchema.pre('save',async function (){
    const salt= await bcrypt.genSalt(10)
    this.password =await bcrypt.hash(this.password,salt)
});

export default mongoose.model('User',userSchema)