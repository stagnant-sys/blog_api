const express = require('express');
const router = express.Router();
const posts_controller = require('../controllers/posts');


// GET all posts
router.get('/', posts_controller.posts_index_get);

// GET post detail
router.get('/:id', posts_controller.post_detail_get);

module.exports = router;