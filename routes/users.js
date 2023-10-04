const express = require('express');
const passport = require('passport');
const router = express.Router();
const users_controller = require('../controllers/users');


/* GET users listing. */
router.get('/', users_controller.users_list_get);

// GET User detail
router.get('/profile', users_controller.user_detail_get);

// POST User signup
router.post('/signup', users_controller.user_signup_post);

// POST user login
router.post('/login', users_controller.user_login_post);

// POST user logout
router.get('/logout', users_controller.user_logout_post);


module.exports = router;
