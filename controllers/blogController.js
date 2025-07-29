const blogService = require('../services/blogService')

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs()
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getBlogById = async (req, res) => {
  try {
    const blog = await blogService.getBlogByIdWithViews(req.params.id)
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getFeaturedBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getFeaturedBlogs()
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.createBlog = async (req, res) => {
  try {
    const blog = await blogService.createNewBlog(req.body, req.user.id)
    res.status(201).json(blog)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateBlog = async (req, res) => {
  try {
    const updated = await blogService.updateUserBlog(req.params.id, req.body, req.user.id)
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.likeBlog = async (req, res) => {
  try {
    const result = await blogService.toggleBlogLike(req.params.id, req.user.id)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteBlog = async (req, res) => {
  try {
    const result = await blogService.deleteUserBlog(req.params.id, req.user.id)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
