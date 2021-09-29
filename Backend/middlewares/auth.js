require('dotenv').config();
const expressJWT = require('express-jwt');


exports.requireSignin = expressJWT({
    secret : process.env.JWT,
    algorithms:["HS256"],
    userProperty: 'auth'
})

exports.isAuth =(req,res,next)=>{
    
    // if(req.auth.role == 1){
    //     return next();
    // }
    let user = req.utilisateur && req.auth && (req.utilisateur._id == req.auth._id)
    if(!user){
        return res.status(403).json({
            error:"Access Denied"
        })
    }
    next()
}

exports.isAdmin = (req,res, next)=>{
    if(req.auth.role == 0){
        return res.status(403).json({
            error:'Admin Resource , Access Denied !'
        })
    }
    next();
}


