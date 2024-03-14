import express from 'express';
import dotenv from 'dotenv'
import colors from 'colors'
//dot config
dotenv.config()


//rest object
const app = express();

//routes
app.get('/',(req,res)=>{
    res.send("<h1>hello ks</h1>");
});

//port
const PORT = process.env.PORT || 2524;

// listen
app.listen(PORT,()=>{
    console.log(`node server running in ${process.env.DEV_MODE} mode and server started at ${PORT}`);
})