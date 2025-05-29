import Comment from "../models/comment.model.js"


export const postComment=async (req,res,next)=>{
    let {id}=req.params
    let {comment}=req.body
    let newComment=await Comment.create({
        comment,
        blogId:id,
        userId:req?.userId
    })
    res.status(201).json({
        message:"Comment posted successfully",
        newComment
    })
}


export const deleteComment=async (req,res,next)=>{
    let {id,commentId}=req.params

    let comment=await Comment.findById(commentId)
    if(comment.userId.toString()!==req.userId.toString()){
        let err=new Error("Not permitted")
        err.statusCode=403
        throw err;
    }

    await Comment.findOneAndDelete({commentId,id})
    res.status(204).json({
        message:"Commented deleted successfully"
    })
}

export const getComments=async (req,res,next)=>{
    let {id}=req.params

    let comments=await Comment.find({blogId:id}).populate("userId","username displayPicture")
 
    res.status(200).json({
        message:"Commented fetched successfully",
        comments
    })
}