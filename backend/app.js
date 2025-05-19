import dotenv from 'dotenv';
dotenv.config()
import express from "express";
import db from './config/db.js';
let app=express()
db()

//middlewares
app.use(express.json())



export default app;