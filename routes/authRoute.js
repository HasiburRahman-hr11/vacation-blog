const router = require('express').Router();
const { registerController, loginController , editProfileController } = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');



router.post('/register' , registerController);
router.post('/login' , loginController);
router.post('/profile/edit/:userId' , upload.single('profilePic'), editProfileController)

module.exports = router;