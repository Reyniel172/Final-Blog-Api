const authenticateToken = require('../middleware/authenticateToken');
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');


// ✅ All routes now require a valid token
router.get('/', authenticateToken, postsController.getAllPosts);
router.get('/:id', authenticateToken, postsController.getPostById);
router.post('/', authenticateToken, postsController.createPost);
router.put('/:id', authenticateToken, postsController.updatePost);
router.delete('/:id', authenticateToken, postsController.deletePost);


module.exports = router;
