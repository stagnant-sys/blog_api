const express = require('express');
const router = express.Router();
const comments_controller = require('../controllersc/comments');

router.delete('/:id/delete', comments_controller.delete_comment_delete)