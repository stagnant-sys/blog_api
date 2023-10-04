const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");

const User = require('../models/user');

// GET all users
exports.users_list_get = asyncHandler(async (req, res, next) => {
  res.send('List of all users;')
});

// GET user detail
exports.user_detail_get = asyncHandler(async (req, res, next) => {
  const user = req.User;
  res.json(user);
})

// POST user signup
exports.user_signup_post = [
  body('username', 'Username must contain at least 3 characters')
    .trim()
    .isLength()
    .escape()
    .custom(async (value) => {
      const username = await User.find({ username: value }).exec();
      if (username.length) {
        throw new Error('This username is already in use')
      }
    }),
  body('password', 'Password must contain at least 5 characters')
    .trim()
    .isLength({ min: 5 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      res.json(errors.array());
      return;
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
          user.password = hashedPassword;
          await user.save();
          res.end();
        } catch(err) {
          return next(err);
        };
      })
    }
  })
]

// POST user login
/*exports.user_login_post = [
  body('username', 'Invalid username')
    .trim()
    .escape(),

  body('password', 'Invalid password')
    .trim(),

  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
  })
]*/

exports.user_login_post = asyncHandler(async (req, res, next) => {
  try {
    passport.authenticate('local', {session: false}, (err, user, info) =>{
      if (err || !user){
        const error = new Error('User does not exist')
        return res.status(403).json({
          info
        })
      }
    req.login(user, {session: false}, (err) => {
      if (err){
        next(err);
      }
      // create token
      const body = {_id: user._id, username: user.username, admin: user.admin}
      return res.status(200).json({body});
    });
  }) (req, res, next);
  } catch (err){
    res.status(403).json({
      err
    })
  }
});