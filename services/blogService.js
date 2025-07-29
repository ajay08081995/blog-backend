const blogRepo = require('../repositories/blogRepository')

const getAllBlogs = () => blogRepo.getAllBlogs()

const getBlogByIdWithViews = async (id) => {
  const blog = await blogRepo.getBlogById(id)
  blog.views += 1
  await blog.save()
  return blog
}

const getFeaturedBlogs = () => blogRepo.getFeaturedBlogs()

const createNewBlog = (data, userId) => blogRepo.createBlog({ ...data, userId })

const updateUserBlog = async (id, data, userId) => {
  const blog = await blogRepo.findBlogById(id)
  if (blog.userId.toString() !== userId.toString()) {
    throw new Error("You can update only your own posts")
  }
  return blogRepo.updateBlog(id, data)
}

const toggleBlogLike = async (id, userId) => {
  const blog = await blogRepo.findBlogById(id)
  const liked = blog.likes.includes(userId)
  if (liked) {
    blog.likes = blog.likes.filter((uid) => uid !== userId)
    await blog.save()
    return { msg: 'Successfully unliked the blog' }
  } else {
    blog.likes.push(userId)
    await blog.save()
    return { msg: 'Successfully liked the blog' }
  }
}

const deleteUserBlog = async (id, userId) => {
  const blog = await blogRepo.findBlogById(id)
  if (blog.userId.toString() !== userId.toString()) {
    throw new Error("You can delete only your own posts")
  }
  await blogRepo.deleteBlogById(id)
  return { msg: 'Successfully deleted the blog' }
}

module.exports = {
  getAllBlogs,
  getBlogByIdWithViews,
  getFeaturedBlogs,
  createNewBlog,
  updateUserBlog,
  toggleBlogLike,
  deleteUserBlog
}
