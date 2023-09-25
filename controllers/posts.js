const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

// GET all posts
exports.posts_index_get = asyncHandler(async (req, res, next) => {
  res.send('GET posts index');
});


// GET post detail (text, comments)
exports.post_detail_get = asyncHandler(async (req, res, next) => {
  res.send('Post id: ' + req.params.id);
});