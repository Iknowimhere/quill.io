import dotenv from 'dotenv';
dotenv.config()
import express from "express";
import db from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import blogRoutes from './routes/blog.routes.js'
import userRoutes from './routes/user.routes.js'
import cors from 'cors'
let app=express()
db()

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))


//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/blogs",blogRoutes)
app.use("/api/v1/users",userRoutes)


//global error handler
app.use(globalErrorHandler)

export default app;