import User from '../models/User.js';
import Blog from '../models/Blog.js';

const getUsers = async (req, res,next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
        if (users.length === 0) {
           let err = new Error("No users found");
            err.statusCode = 404;
            throw err;
        }
    } catch (error) {
        next(error);
    }
}

const getBlogs = async (req, res,next) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
        if (blogs.length === 0) {
           let err = new Error("No blogs found");
            err.statusCode = 404;
            throw err;
        }
    } catch (error) {
        next(error);
    }
}

const updateUserRole = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            let err = new Error("User not found");
            err.statusCode = 404;
            throw err;
        }
        if (user.role === "admin") {
            let err = new Error("User is already an admin");
            err.statusCode = 400;
            throw err;
        }
        if (user.role === "author") {
            let err = new Error("User is already an author");
            err.statusCode = 400;
            throw err;
        }
        user.role = "admin";
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            let err = new Error("Blog not found");
            err.statusCode = 404;
            throw err;
        }
        const commentIndex = blog.comments.findIndex(comment => comment._id.toString() === req.params.commentId);
        if (commentIndex === -1) {
            let err = new Error("Comment not found");
            err.statusCode = 404;
            throw err;
        }
        blog.comments.splice(commentIndex, 1);
        await blog.save();
        res.status(204).json({ message: "Comment deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export { getUsers, getBlogs, updateUserRole, deleteComment };