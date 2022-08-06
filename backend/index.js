const mongoose = require("mongoose") ; 
const mainRouter = require("./routers/index")
const express = require("express") ; 
const app = express() ; 
const cors = require("cors");
const urlParser = express.json({limit: '50mb'}) ; 
app.use(cors())
require("dotenv").config()
app.use(urlParser) ; 
app.use(mainRouter) 
app.use(express.urlencoded({limit: '50mb'}));
app.get("/" , (req , res) => {
    res.send("hello world")
})

mongoose.connect(`${process.env.MONGODB_CLUSTER_LINK}` , {
    useNewUrlParser : true , 
    useUnifiedTopology : true 
}) 
mongoose.connection.on("connected" , () => {
    console.log("connected") ; 
})
mongoose.connection.on("error" , (err) => {
    console.log("error" , err)
})
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})