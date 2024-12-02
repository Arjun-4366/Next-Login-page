const express = require('express')
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const userRouter = require('./routes/userRoutes')
const cors = require("cors")
dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("db connected")
})
const PORT = process.env.PORT

const options = {
    origin:"http://localhost:3000"
}
app.use(cors(options))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/',userRouter)

app.listen(PORT,()=>{
    console.log("server is running at",PORT)
})