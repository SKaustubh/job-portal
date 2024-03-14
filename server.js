import express from 'express';

//rest object
const app = express();

//routes
app.get('/',(req,res)=>{
    res.send("<h1>hello</h1>");
});

// listen
app.listen(5000,()=>{
    console.log("node server started");
})