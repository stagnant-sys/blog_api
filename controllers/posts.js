const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

// POST blogpost create
exports.post_create_post = asyncHandler(async (req, res, next) => {
  // ADD AUTHOR IDENTIFIER (req.user)
  const post = new BlogPost({
    author: '651536144dfb5f33cc0f8c63',
    title: req.body.title,
    text: req.body.text,
    visibility: 'hidden',
  })
  await post.save();
  res.end();
})


// PUT post visibility
exports.post_visibility_put = asyncHandler(async (req, res, next) => {
  const post = await BlogPost.findById(req.params.id).exec();
  post.visibility === 'public' ? post.visibility = 'hidden' : post.visibility = 'public';
  await post.save();
  res.end();
})


// PUT edit post
exports.post_edit_put = [
  body('title', 'Title must be at least 5 characters long')
    .trim(),
  body('text', 'Text must be at least 5 characters long')
    .trim(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const post = await BlogPost.findById(req.params.id).exec();
    post.title = req.body.title;
    post.text = req.body.text;
    await post.save();
    res.end();
  })
]

// DELETE post
exports.post_delete_delete = asyncHandler(async (req, res, next) => {
  await BlogPost.findByIdAndRemove(req.params.id);
  res.end();
} )