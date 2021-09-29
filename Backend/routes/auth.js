const express = require('express');
const {signup, signin, signout } = require('../controllers/authController')
const { userSignUpValidator } = require('../middlewares/userValidator')
  // const { requireSignin } = require('../middlewares/auth');
const router = express.Router();

router.post('/signup', userSignUpValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)
// router.get("/hello",requireSignin , (req,res)=>{
//     res.send('hello hind');
// })


module.exports = router;