import Blog from "../models/blog.model.js"

const createBlog=async (req,res,next)=>{
    let {userId}=req;
    console.log(userId);
    
    let {title,description}=req.body;
    let newBlog=await Blog.create({
        title,
        description,
        authorId:userId
    })

    res.status(201).json({
        message:"Blog created Successfully",
        newBlog
    })
}

const getBlogs=async (req,res,next)=>{
    let blogs=await Blog.find()
    res.status(201).json({
        message:"Fetched Blogs Successfully",
        blogs:blogs.map(blog=>{
            return {
                title:blog.title,
                blogImage:blog.blogImage,
                comments:blog?.comments,
                likes:blog?.likes,
                views:blog?.views
            }
        })
    })
}

const getBlog=async (req,res,next)=>{
    let {id}=req.params;
    let blog=await Blog.findById(id)
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