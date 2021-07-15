const express = require('express');
const {signup, signin, signout } = require('../controllers/authController')
const { userSignUpValidator } = require('../middlewares/userValidator')
//  const { requireSignIn } = require('../middlewares/auth');
const router = express.Router();

router.post('/signup', userSignUpValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)


module.exports = router;