import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connection from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
// app config
const app = express()
const port = process.env.PORT || 4000
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin', adminRouter)// localhost:4000/api/admin/
app.use('/api/doctor', doctorRouter)// localhost:4000/api/doctor/
app.use('/api/user', userRouter)// localhost:4000/api/user/

// testing api
app.get('/', (req, res) => {
    res.send("API Working")
})

// listening to the port
app.listen(port, (error) => {
    if (error) return console.log("Connection Error \n", error);
    console.log(`Your Server is running on http://localhost:${port}`)
    connection()
})