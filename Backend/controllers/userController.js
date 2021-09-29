const User = require("../models/user")

exports.getOneUser = (req,res)=>{
    res.json({
        user: req.utilisateur
    })
}
exports.updateUser = (req,res) => {

    User.findOneAndUpdate({ _id :req.utilisateur._id},{$set: req.body},{new:true},(err,user) => {
        if(err){
           return res.status(400).json({err})
        }
        user.password = undefined
        
        res.json({user})
    })

    
   
}