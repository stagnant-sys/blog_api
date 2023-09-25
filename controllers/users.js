const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

// GET all users
exports.users_list_get = asyncHandler(async (req, res, next) => {
  res.send('List of all users;')
});

// GET user detail
exports.user_detail_get = asyncHandler(async (req, res, next) => {
  res.send('Details for user' + req.params.id);
})