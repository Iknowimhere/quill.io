import express from 'express'
import auth from '../middlewares/auth.js';
import { updateUser, updateUserRole } from '../controllers/user.controllers.js';
let router=express.Router()


//route to update user details
router.put("/settings",auth,updateUser)
//route to update user to author
router.put("/settings/role",auth,updateUserRole)

export default router;