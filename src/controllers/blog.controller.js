const Blog = require('../models/Blog');
const ApiError = require('../utils/ApiError');
const sendResponse = require('../utils/sendResponse');
const pick = require('../utils/pick');

const BLOG_FIELDS = ['title', 'content', 'authorName', 'tags', 'blogImage'];

const findBlogOrFail = async (id) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new ApiError(404, 'Blog not found');
  return blog;
};

// Shared by update and delete: the blog must exist and belong to the user.
const findOwnedBlog = async (id, userId) => {
  const blog = await findBlogOrFail(id);
  if (!blog.author.equals(userId)) throw new ApiError(403, 'You can only modify your own blogs');
  return blog;
};

const createBlog = async (req, res) => {
  const blog = await Blog.create({
    authorName: req.user.name,
    ...pick(req.body, BLOG_FIELDS),
    author: req.user._id,
  });
  sendResponse(res, 201, 'Blog created', blog);
};

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  sendResponse(res, 200, 'Blogs fetched', blogs);
};

const getBlog = async (req, res) => {
  sendResponse(res, 200, 'Blog fetched', await findBlogOrFail(req.params.id));
};

const updateBlog = async (req, res) => {
  const blog = await findOwnedBlog(req.params.id, req.user._id);
  blog.set(pick(req.body, BLOG_FIELDS));
  await blog.save();
  sendResponse(res, 200, 'Blog updated', blog);
};

const deleteBlog = async (req, res) => {
  const blog = await findOwnedBlog(req.params.id, req.user._id);
  await blog.deleteOne();
  sendResponse(res, 200, 'Blog deleted');
};

module.exports = { createBlog, getAllBlogs, getBlog, updateBlog, deleteBlog };
