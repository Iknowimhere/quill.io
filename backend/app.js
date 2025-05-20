import dotenv from 'dotenv';
dotenv.config()
import express from "express";
import db from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
let app=express()
db()

//middlewares
app.use(express.json())
//routes
app.use("/api/v1/auth",authRoutes)


//global error handler
app.use(globalErrorHandler)

export default app;