const express = require('express');
const router =express.Router();
const {userById} = require ('../middlewares/user');
const {createCategory ,getCategory,categoryId,updateCategory,deleteCategory,allCategories}= require('../controllers/categoryController')
const {requireSignin,isAuth,isAdmin} = require('../middlewares/auth');


router.post('/create/:userId',[requireSignin, isAuth, isAdmin],createCategory)

router.param('userId', userById)
router.get('/:categoryId' ,getCategory);
router.param('categoryId',categoryId)
router.put('/:categoryId/:userId',[requireSignin, isAuth, isAdmin],updateCategory)
router.delete('/:categoryId/:userId',[requireSignin, isAuth, isAdmin],deleteCategory)
router.get('/',allCategories)


















module.exports= router;
