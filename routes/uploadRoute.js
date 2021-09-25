const router = require('express').Router();
const { postImageUploadController } = require('../controllers/uploadController');
const upload = require('../middleware/uploadMiddleware');

router.post('/postimage' , upload.single('post-image') , postImageUploadController);

module.exports = router;