import User from "../models/user.model.js"

export const updateUser=async (req,res,next)=>{

    if(req.body.password || req.body.email || req.body.confirmPassword ||req.body.role){
        delete req.body.password
        delete req.body.confirmPassword
        delete req.body.email
        delete req.body.role
    }
    
    let user=await User.findByIdAndUpdate(req.userId,{...req.body,displayPicture:req.file.path},{new:true,runValidators:true})
    res.status(200).json(user)
}

export const updateUserRole=async (req,res,next)=>{

       if(req.body.password || req.body.email || req.body.confirmPassword ||req.body.username || req.body.role){
        delete req.body.password
        delete req.body.confirmPassword
        delete req.body.email
        delete req.body.username
        delete req.body.role
    }
    let user=await User.findByIdAndUpdate(req.userId,{role:"author"},{new:true})
    res.status(200).json(user)
}