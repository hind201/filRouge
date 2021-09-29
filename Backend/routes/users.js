const express = require('express');
const {getOneUser,updateUser}=require('../controllers/userController')
 const {userById} = require ('../middlewares/user');
 const {requireSignin, isAuth, isAdmin}= require ('../middlewares/auth')

 const router =express.Router();
 router.get('/utilisateur/:userId', requireSignin,isAuth, getOneUser)
 router.param('userId', userById)
 router.put('/utilisateur/:userId', requireSignin,isAuth, updateUser)
 
 module.exports=router;