const express = require('express');
const router =express.Router();
const {userById} = require ('../middlewares/user');
const {createProduct,getProduct,productById,deleteProduct,updateProduct,allProducts,relatedProduct,searchProduct,imageProduct} = require('../controllers/productController')
const {requireSignin,isAuth,isAdmin} = require('../middlewares/auth')

router.post('/create/:userId', [requireSignin, isAuth, isAdmin], createProduct)

router.param('userId', userById)
router.get('/:productId',getProduct);
router.param('productId',productById)
router.put('/:productId/:userId',[requireSignin, isAuth, isAdmin], updateProduct)
router.delete('/:productId/:userId',[requireSignin, isAuth, isAdmin], deleteProduct)
router.get('/',allProducts)
router.get('/related/:productId',relatedProduct)
router.post('/search',searchProduct);
router.get('/image/:productId',imageProduct)
















module.exports= router;
