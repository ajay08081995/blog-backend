const Blog = require('../models/Blog')

const getAllBlogs = () => Blog.find({}).populate('userId', '-password')

const getBlogById = (id) => Blog.findById(id).populate('userId', '-password')

const getFeaturedBlogs = () => Blog.find({ featured: true }).populate('userId', '-password').limit(3)

const createBlog = (data) => Blog.create(data)

const updateBlog = (id, data) =>
  Blog.findByIdAndUpdate(id, { $set: data }, { new: true }).populate('userId', '-password')

const deleteBlogById = (id) => Blog.findByIdAndDelete(id)

const findBlogById = (id) => Blog.findById(id)

module.exports = {
  getAllBlogs,
  getBlogById,
  getFeaturedBlogs,
  createBlog,
  updateBlog,
  deleteBlogById,
  findBlogById
}
