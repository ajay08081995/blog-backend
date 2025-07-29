// import express from 'express';
const express = require('express');


const router = express.Router();
const authRouter = require('../routers/authRouters');
const blogRouter = require('../routers/blogRoutes');

router.use('/auth', authRouter);
router.use('/blog',blogRouter);

module.exports = router;