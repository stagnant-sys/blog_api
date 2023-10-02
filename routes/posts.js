const express = require('express');
const router = express.Router();
const posts_controller = require('../controllers/posts');


// GET all public posts
router.get('/public', posts_controller.posts_index_public_get);

// GET all posts (private and public)
router.get('/all', posts_controller.posts_index_get);

// POST create post
router.post('/create', posts_controller.post_create_post);

// PATCH post visibility
router.put('/:id/visibility', posts_controller.post_visibility_put);

// PATCH edit post
router.put('/:id/edit', posts_controller.post_edit_put);

// DELETE post
router.delete('/:id/delete', posts_controller.post_delete_delete);

// GET post detail
router.get('/:id', posts_controller.post_detail_get);

// POST comment
router.post('/:id/comment', posts_controller.post_comment_post);

module.exports = router;