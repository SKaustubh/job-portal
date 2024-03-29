
// packages imports
import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan';

//files import
import colors from 'colors'
import connectDB from './config/db.js';

//routes import
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import jobsRoutes from './routes/jobsRoutes.js'
//dot config
dotenv.config()

// mongoDB connection
connectDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(cors())
app.use(morgan("dev"))

//routes
app.use('/api/v1/test', testRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/job", jobsRoutes);

//validation middlewares
app.use(errorMiddleware);

//port
const PORT = process.env.PORT || 2524;

// listen
app.listen(PORT, () => {
    console.log(`node server running in ${(process.env.DEV_MODE).blue}  and server started at ${(PORT).yellow}`);
})