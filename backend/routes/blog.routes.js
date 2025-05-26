import express from 'express'
import auth, { verifyRole } from '../middlewares/auth.js'
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from '../controllers/blog.controllers.js'
let router=express.Router()
import multer from 'multer'
import storage from '../middlewares/fileUpload.js'
let upload=multer({storage})

router.post("/",auth,verifyRole("admin","author"),upload.single("blogImage"),createBlog)
router.get("/",getBlogs)
router.get("/:slug",auth,getBlog)
router.put("/:id",auth,verifyRole("admin","author"),updateBlog)
router.delete("/:id",auth,verifyRole("admin","author"),deleteBlog)

export default router;


