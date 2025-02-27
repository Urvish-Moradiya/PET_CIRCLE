const express = require("express") //express....
const mongoose = require("mongoose")
//express object..
const app = express()
app.use(express.json())//for accept data in json format


const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)


mongoose.connect("mongodb://127.0.0.1:27017/UserData").then(()=>{
    console.log("database connected....")
})

//server creation...
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})