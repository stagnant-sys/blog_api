const express = require('express');
const router = express.Router();
const users_controller = require('../controllers/users');


/* GET users listing. */
router.get('/', users_controller.users_list_get);

// GET User detail
router.get('/:id', users_controller.user_detail_get);


module.exports = router;
