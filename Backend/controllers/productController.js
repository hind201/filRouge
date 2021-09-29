const Product = require('../Models/product')
const _ =require('lodash')
const fs = require('fs')
const Joi = require('joi')
const formidable = require('formidable')
const product = require('../Models/product')

exports.createProduct = (req,res) =>{
    let form = new formidable.IncomingForm();
    // form.uploadDir="./image";
    form.keepExtensions=true;
    // form.multiples = true;
    
    form.parse(req, (err,fields,files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not uploaded:!'
            })
        }
       
        let product = new Product(fields);
        if(files.photo){
           if(files.photo.size > Math.pow(10,6)){
               return res.status(400).json({
                   error : 'Image should be less than 1mb in size !'
               })
           }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        const schema = Joi.object({
            name:Joi.string().required(),
            description:Joi.string().required(),
            price:Joi.string().required(),
            quantity:Joi.string().required(),
            category:Joi.string().required()
        })
        
        const {error} = schema.validate(fields);
        if(error) {
            return res.status(400).json({
                error:error.dtails[0].message
            })
        }
       
        product.save((err,product)=>{
        
            if(err){
                return res.status(400).send(err)
            }
          
            res.json({
                product
            })
        })
       
    })


}

exports.productById = (req,res,next,id)=>{
    Product.findById(id).exec((err,product)=>{
        if(err || !product){
            return  res.status(404).json({
                error: 'Product not found!'
            })
        }
         req.product = product;
         next()
    })
}
exports.getProduct = (req,res) =>{
    req.product.photo = undefined ;
    res.json({
        product: req.product
    })

}
exports.deleteProduct = (req,res)=>{
    let product = req.product
    product.remove((err,product)=>{
        if(err){
            return res.status(404).json({
                error:'Product not found'
            })
        }
        res.status(404).json({
            message:' Product deleted'
        })
    })

}

exports.updateProduct =(req,res)=>{
    let form = new formidable.IncomingForm();
    // form.uploadDir="./image";
    form.keepExtensions=true;
    // form.multiples = true;
    
    form.parse(req, (err,fields,files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not uploaded:!'
            })
        }
        let product = req.product;

        product= _.extend(product,fields)

        if(files.photo){
           if(files.photo.size > Math.pow(10,6)){
               return res.status(400).json({
                   error : 'Image should be less than 1mb in size !'
               })
           }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        const schema = Joi.object({
            name:Joi.string().required(),
            description:Joi.string().required(),
            price:Joi.string().required(),
            quantity:Joi.string().required(),
            category:Joi.string().required()
        })
        
        const {error} = schema.validate(fields);
        if(error) {
            return res.status(400).json({
                error:error.dtails[0].message
            })
        }
       
        product.save((err,product)=>{
        
            if(err){
                return res.status(400).json({
                    err:'Product not updated'
                })
            }
          
            res.json({
                product
            })
        })
       
        
    })
}
exports.allProducts =(req,res)=>{
    let filter  = req.query.filter ? req.query.filter: '_id'
    let order  = req.query.order ? req.query.order : 'asc' 
    let limit = req.query.limit ?parseInt( req.query.limit) : 8  
    Product.find()
    .select('-photo')
    .populate('category')
    .sort([[filter,order]])
    .limit(limit)
    .exec((err, products) =>{
        if(err){
            return res.status(404).json({
                error: 'Products not found !'
            })
        }
       res.json({
           products
       })
    })

}
exports.relatedProduct = (req,res)=>{
    let limit = req.query.limit ? parseInt( req.query.limit) : 80  ;
    Product.find({category: req.product.category, _id:{$ne: req.product._id}})
    .limit(limit)
    .populate('category','_id name')
    .exec((err,products)=>{
        if(err){
            return res.status(404).json({
                error:'Products not found !'
            })
        }
        res.json({
            products
        })
    })
}

exports.searchProduct = (req,res) => {
    let filter  = req.query.filter ? req.query.filter: '_id';
    let order = req.query.order ? req.query.order : 'asc';
    let limit = req.query.limit ? parseInt(req.query.limit) :80;
    let skip = parseInt(req.body.skip)
    let findArgs ={}
    for (let key in req.body.filters){
        if (req.body.filters[key].length > 0){
            if(key === "price"){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            }else{
                findArgs[key] = req.body.filters[key];
            }

        }
    }
    Product.find(findArgs)
    .select('-photo')
    .populate('category')
    .sort([[filter,order]])
    .limit(limit)
    .skip(skip)
    .exec((err, products) =>{
        if(err){
            return res.status(404).json({
                error: 'Products not found !'
            })
        }
       res.json({
           products
       })
    })
    

}
exports.imageProduct = (req,res)=>{
    const {data, contentType}= req.product.photo
    if(data){
        res.set('Content-Type', contentType)
        return res.send(data)
    }
}