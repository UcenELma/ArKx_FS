const express = require('express');
const postsController = require('../controllers/postsController');
const router = express.Router();

router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);

//
// router.get('/:id', (req, res) => {
//     // Simulate a server error
//     throw new Error('Simulated internal server error');
//   });

router.post('/', postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;

