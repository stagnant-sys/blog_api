const express = require('express');
const router = express.Router();
const users_controller = require('../controllers/users');


/* GET users listing. */
router.get('/', users_controller.users_list_get);

// GET User detail
router.get('/:id', users_controller.user_detail_get);

// POST User signup
router.post('/signup', users_controller.user_signup_post);

// Login
router.post('/login', users_controller.log_in_post);

// Check user
router.get('/check', users_controller.check_user);

// Logout
router.get('logout', users_controller.log_out_get);

module.exports = router;
