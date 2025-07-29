const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')
const verifyToken = require('../middlewares/verifyToken')

// Public routes
router.get('/getAll', blogController.getAllBlogs)
router.get('/find/:id', blogController.getBlogById)
router.get('/featured', blogController.getFeaturedBlogs)

// Protected routes
router.post('/', verifyToken, blogController.createBlog)
router.put('/updateBlog/:id', verifyToken, blogController.updateBlog)
router.put('/likeBlog/:id', verifyToken, blogController.likeBlog)
router.delete('/deleteBlog/:id', verifyToken, blogController.deleteBlog)

module.exports = router
