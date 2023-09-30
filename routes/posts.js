const express = require('express');
const router = express.Router();
const posts_controller = require('../controllers/posts');


// GET all public posts
router.get('/public', posts_controller.posts_index_public_get);

// GET all posts (private and public)
router.get('/all', posts_controller.posts_index_get);

// POST create post
router.post('/create', posts_controller.post_create_post);

// PUT post visibility
router.put('/:id/visibility', posts_controller.post_visibility_put);

// DELETE post
router.delete('/:id/delete', posts_controller.post_delete_delete);

// GET post detail
router.get('/:id', posts_controller.post_detail_get);

module.exports = router;