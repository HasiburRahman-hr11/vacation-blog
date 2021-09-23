const router = require('express').Router();
const upload = require('../middleware/uploadMiddleware');
const {
    createPostController , 
    getAllPostsController , 
    getSinglePostController, 
    getFeaturePostController,
    editPostController,
    deletePostController,
    getTrendingPosts,
    getCategoryPosts,
    getRecentPostController,
    getEditPostController,
    getAllPostsWPController
} = require('../controllers/postController');

// Create New Post
router.post('/create' , upload.single('thumbnail') , createPostController);

// Update Post
router.put('/update/:postId', upload.single('thumbnail') , editPostController);

// Delete Post
router.delete('/delete/:postId' , deletePostController);

// Get All Post
router.get('/' , getAllPostsController);

// get all posts wothout pagination
router.get('/all' , getAllPostsWPController);

// Get Recent Posts
router.get('/recent' , getRecentPostController);

// Get Trending Posts
router.get('/trending', getTrendingPosts);

// Get Feature Post
router.get('/feature' , getFeaturePostController);

// Get Posts by category
router.get('/category/:catName', getCategoryPosts);

// Get Edit Post
router.get('/edit/:postId' , getEditPostController);

// Get Single Post
router.get('/:postId' , getSinglePostController);

module.exports = router;