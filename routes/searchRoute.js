const { autocompleteSearchController , searchPostsController } = require('../controllers/searchController');

const router = require('express').Router();

router.get('/auto' , autocompleteSearchController);
router.get('/posts' , searchPostsController);

module.exports = router;