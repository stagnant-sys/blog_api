const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");

const User = require('../models/user');

// GET all users
exports.users_list_get = asyncHandler(async (req, res, next) => {
  res.send('List of all users;')
});

// GET user detail
exports.user_detail_get = asyncHandler(async (req, res, next) => {
  res.send('Details for user' + req.params.id);
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

// Log in
exports.log_in_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/user/log-in",
  failureMessage: true
})

exports.check_user = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  res.end();
})


// Log out
exports.log_out_get = asyncHandler((req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
})
