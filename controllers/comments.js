const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const BlogPost = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

// DELETE comment
exports.delete_comment_delete = asyncHandler(async (req, res, next) => {
  await Comment.findByIdAndRemove(req.params.id);
  res.end();
});