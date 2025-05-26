import express from 'express'
import auth, { verifyRole } from '../middlewares/auth.js'
import { addViews, createBlog, deleteBlog, getBlog, getBlogs, toggleLike, updateBlog } from '../controllers/blog.controllers.js'
let router=express.Router()
import multer from 'multer'
import storage from '../middlewares/fileUpload.js'
let upload=multer({storage})

router.post("/",auth,verifyRole("admin","author"),upload.single("blogImage"),createBlog)
router.get("/",getBlogs)
router.get("/:slug",auth,getBlog)
router.put("/:id",auth,verifyRole("admin","author"),updateBlog)
router.delete("/:id",auth,verifyRole("admin","author"),deleteBlog)

router.post("/:id/views",auth,addViews)
router.put("/:id/likes",auth,toggleLike)


export default router;


