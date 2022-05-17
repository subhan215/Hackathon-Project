const mongoose = require("mongoose") ; 
const mainRouter = require("./routers/index")
const express = require("express") ; 
const app = express() ; 
const PORT = 5000 ; 
const cors = require("cors")
const urlParser = express.json() ; 
app.use(cors())

app.use(urlParser) ; 
app.use(mainRouter) ; 

mongoose.connect("mongodb+srv://subhan12:security12@cluster0.ts1ff.mongodb.net/?retryWrites=true&w=majority" , {
    useNewUrlParser : true , 
    useUnifiedTopology : true 
}) 
mongoose.connection.on("connected" , () => {
    console.log("connected") ; 
})
mongoose.connection.on("error" , (err) => {
    console.log("error" , err)
})
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})