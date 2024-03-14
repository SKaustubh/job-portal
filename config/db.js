import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to MongoDb database ${mongoose.connection.host}`.magenta)
    } catch (error) {
        console.log(`MongoDb Error ${error}`.red.underline)
        
    }
}

export default connectDB