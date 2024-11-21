const express = require("express");
const app = express();
const ExpressError = require("./ExpressError.js")


// simple middleware
app.use("/random",(req,res,next)=>{
    console.log("hi i for random only");
    next();
});

// utility middleware
app.use((req,res,next)=>{
    req.time = new Date();
    console.log("path :",req.path,", host : ",req.hostname,", method : ",req.method, ", at : ",req.time.toString());
    next();
});

// validation middleware
app.use("/api",(req,res,next)=>{
    const {token} = req.query;
    if (token==="giveaccess"){
        next();
    }else{
        throw new ExpressError(401,"ACCESS DENIED!");
    }
});


app.get("/",(req,res)=>{
    res.send("root");
});

app.get("/random",(req,res)=>{
    res.send("random");
});

app.get("/api",(req,res)=>{
    res.send("api data");
});

// admin route
app.get("/admin",(req,res)=>{
    throw new ExpressError(403,"only admin can access")
});

app.get("/err",(req,res)=>{
    abcd = bcde;
});

// error handling middleware
app.use((err,req,res,next)=>{
    const {status = 500 , message = "some error occured" } = err;    
    res.status(status).send(message)
});

// error handle
// app.use((req,res)=>{
//     res.status(404).send("Page not found");
// });

app.listen(8080,()=>{
    console.log("listening at 8080");
});