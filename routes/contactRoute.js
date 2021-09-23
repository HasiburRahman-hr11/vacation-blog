const { contactController } = require('../controllers/contactController');

const router = require('express').Router();

router.post('/send' , contactController);

module.exports = router;