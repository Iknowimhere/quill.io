import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import slugify from "../utils/slugify.js";

const createBlog = async (req, res, next) => {
  let { userId } = req;
  console.log(userId);

  let { title, description, category } = req.body;
  let newBlog = await Blog.create({
    title,
    slug: slugify(title),
    category,
    description,
    authorId: userId,
    blogImage: req.file.path,
  });

  res.status(201).json({
    message: "Blog created Successfully",
    newBlog,
  });
};

const getBlogs = async (req, res, next) => {
  let { search = "", category = "", page = 1, limit = 5 } = req.query;

  let queryObj = { title: { $regex: search, $options: "i" } };

  if (req.query.category) {
    queryObj.category = category;
  }
  let blogs = await Blog.find(queryObj)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  let totalBlogs = await Blog.countDocuments();
  res.status(200).json({
    message: "Fetched Blogs Successfully",
    totalBlogs,
    page,
    blogs: blogs.map((blog) => {
      return {
        title: blog.title,
        blogImage: blog.blogImage,
        comments: blog?.comments,
        category: blog.category,
        slug: blog.slug,
        likes: blog?.likes,
        views: blog?.views,
      };
    }),
  });
};

const getBlog = async (req, res, next) => {
  let { slug } = req.params;
  let blog = await Blog.findOne({ slug });
  res.status(201).json({
    message: "Feteched blog Successfully",
    blog,
  });
};

const updateBlog = async (req, res, next) => {
  let { id } = req.params;
  let upatedBlog = await Blog.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  res.status(201).json({
    message: "Blog updated Successfully",
    upatedBlog,
  });
};

const deleteBlog = async (req, res, next) => {
  let { id } = req.params;
  await Blog.findByIdAndDelete(id);
  res.status(201).json({
    message: "Blog deleted Successfully",
  });
};

const addViews = async (req, res, next) => {
  let { id } = req.params;
  let user = await User.findById(req.userId);
  if (!user) {
    let err = new Error("Please login!!");
    err.statusCode = 403;
    throw err;
  }
  let blog = await Blog.findById(id);
  blog.views = blog.views + 1;
  await blog.save();
  return res.status(200).send()
};

const toggleLike = async (req, res, next) => {
  let { id } = req.params;
  let user = await User.findById(req.userId);
  if (!user) {
    let err = new Error("Please login!!");
    err.statusCode = 403;
    throw err;
  }
  let blog = await Blog.findById(id);
  let result = blog.likes.includes(req.userId);
  if (result) {
      let index=blog.likes.findIndex((id) => id == req.userId);
      blog.likes.splice(index,1);
      await blog.save()
      return res.status(200).send()
    }
    //user is not present we push user into likes array
    blog.likes.push(user?._id);
    await blog.save()
    return res.status(200).send()
};

export { createBlog, getBlogs, getBlog, updateBlog, deleteBlog, addViews,toggleLike };
