import User from "../models/user.model.js"

export const updateUser=async (req,res,next)=>{
    let user=await User.findByIdAndUpdate(req.userId,{...req.body},{new:true})
    res.status(200).json(user)
}

export const updateUserRole=async (req,res,next)=>{
    let user=await User.findByIdAndUpdate(req.userId,{role:"author"},{new:true})
    res.status(200).json(user)
}