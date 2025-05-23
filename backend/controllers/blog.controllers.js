import Blog from "../models/blog.model.js"
import slugify from "../utils/slugify.js";

const createBlog=async (req,res,next)=>{
    let {userId}=req;
    console.log(userId);
    
    let {title,description,category}=req.body;
    let newBlog=await Blog.create({
        title,
        category,
        description,
        authorId:userId,
        slug:slugify(title)
    })

    res.status(201).json({
        message:"Blog created Successfully",
        newBlog
    })
}

const getBlogs=async (req,res,next)=>{
    let {search="",category=""}=req.query
    
    let queryObj={title:{$regex:search,$options:"i"}}

    if(req.query.category){
        queryObj.category=category
    }
    let blogs=await Blog.find(queryObj)
    res.status(200).json({
        message:"Fetched Blogs Successfully",
        blogs:blogs.map(blog=>{
            return {
                title:blog.title,
                blogImage:blog.blogImage,
                comments:blog?.comments,
                category:blog.category,
                slug:blog.slug,
                likes:blog?.likes,
                views:blog?.views
            }
        })
    })
}

const getBlog=async (req,res,next)=>{
    let {slug}=req.params;
    let blog=await Blog.findOne({slug})
    res.status(201).json({
        message:"Feteched blog Successfully",
        blog
    })
}

const updateBlog=async (req,res,next)=>{
    let {id}=req.params;
    let upatedBlog=await Blog.findByIdAndUpdate(id,{...req.body},{new:true})
    res.status(201).json({
        message:"Blog updated Successfully",
        upatedBlog
    })
}

const deleteBlog=async (req,res,next)=>{
    let {id}=req.params;
    await Blog.findByIdAndDelete(id)
    res.status(201).json({
        message:"Blog deleted Successfully"
    })
}

export {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog
}