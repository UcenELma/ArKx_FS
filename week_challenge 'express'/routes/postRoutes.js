const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.delete('/:id', postController.deletePost);
router.put('/:id', postController.updatePost);

module.exports = router;
