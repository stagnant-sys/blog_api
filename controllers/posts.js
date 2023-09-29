const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

const BlogPost = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

// GET all public posts
exports.posts_index_public_get = asyncHandler(async (req, res, next) => {
  const posts = await BlogPost.find({ visibility: 'public' })
    .sort({ timestamp: -1 })
    .populate('author', 'username')
    .exec();
  res.json(posts);
});

// GET all posts (private and public)
exports.posts_index_get = asyncHandler(async (req, res, next) => {
  const posts = await BlogPost.find({})
    .sort({ timestamp: -1 })
    .populate('author')
    .exec();
  res.json(posts);
})


// GET post detail (text, comments)
exports.post_detail_get = asyncHandler(async (req, res, next) => {
  const [post, comments] = await Promise.all([
    await BlogPost.findById(req.params.id).populate('author', 'username').exec(),
    await Comment.find({ post : req.params.id }).populate('author', 'username').exec(),
  ])
  res.json({post, comments});
});


// PUT post visibility
exports.post_visibility_put = asyncHandler(async (req, res, next) => {
  const post = await BlogPost.findById(req.params.id).exec();
  post.visibility === 'public' ? post.visibility = 'hidden' : post.visibility = 'public';
  await post.save();
  res.redirect(`/posts/${req.params.id}`);
} )