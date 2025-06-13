import { Router } from "express";
import auth, { verifyRole } from "../middlewares/auth.js";
import {
  deleteComment,
  getBlogs,
  getUsers,
  updateUserRole,
} from "../controllers/admin.controllers.js";

let router = Router();

router.get("/users", auth, verifyRole("admin"), getUsers);
router.get("/blogs", auth, verifyRole("admin"), getBlogs);

router.put("/users/:id/role", auth, verifyRole("admin"), updateUserRole);

router.delete("/comments/:id", auth, verifyRole("admin"), deleteComment);

export default router;
