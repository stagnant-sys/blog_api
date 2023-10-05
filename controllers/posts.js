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
    .sort({ createdAt: 1 })
    .populate('author', 'username')
    .exec();
  res.json(posts);
});

// GET all posts (private and public)
exports.posts_index_get = asyncHandler(async (req, res, next) => {
  const posts = await BlogPost.find({})
    .sort({ createdAt: 1 })
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
exports.post_create_post = [
  body('title', 'Title must be at least 5 characters long')
    .trim(),
  body('text', 'Text must be at least 5 characters long')
    .trim(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const post = new BlogPost({
      author: req.body.author,
      title: req.body.title,
      text: req.body.text,
      visibility: req.body.visibility,
    })
    await post.save();
    res.end();
  }) 
]



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

// POST comment
exports.post_comment_post = [
  body('text', 'Text must be at least 5 characters long')
    .trim(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const comment = new Comment ({
      author: req.body.author,
      post: req.params.id,
      text: req.body.text,
    });
    await comment.save();
    res.end();
  })
]