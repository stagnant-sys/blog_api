const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const BlogPost = require('../models/post');
const User = require('../models/user');

// GET all posts
exports.posts_index_get = asyncHandler(async (req, res, next) => {
  const posts = await BlogPost.find({ visibility: 'public' })
    .sort({ timestamp: -1 })
    .populate('author')
    .exec();
  res.json(posts);
});


// GET post detail (text, comments)
exports.post_detail_get = asyncHandler(async (req, res, next) => {
  const post = await BlogPost.findById(req.params.id).exec();
  res.json(post);
});