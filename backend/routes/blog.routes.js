import express from 'express'
import auth from '../middlewares/auth.js'
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from '../controllers/blog.controllers.js'
let router=express.Router()

router.post("/",auth,createBlog)
router.get("/",getBlogs)
router.get("/:id",auth,getBlog)
router.put("/:id",auth,updateBlog)
router.delete("/:id",auth,deleteBlog)

export default router;


