require('dotenv').config();
const User = require('../models/user');
const mongoose =require('mongoose')
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup =async(req,res)=>{
 
 const {name,email,adress,password}= req.body;
          // Password Encryption
 const hashh= await bcrypt.hash(password, 10);

 const user= new User({
       name:name,
       email:email,
       adress:adress,
       password:hashh
     });
    
         //save mongod
 user.save((err, user)=>{
         if(err){
             return res.status(400).send(err)
         }
        res.send(user)

     })
     }


exports.signin= (req,res) =>{

const {email,password}=req.body;
 User.findOne({email},async(err,user)=>{

    if(err|| !user){
        return res.status(400).json({
            error:'User not fond with this email, Please SignUp!'
        })

 }
 const isMatch =await bcrypt.compare(password, user.password)
 if(!isMatch) return res.status(400).json({msg: "Incorrect password."})
    
 
 const token = jwt.sign({ id:user._id, role: user.role,}, process.env.JWT);
    
    return res.status(200).cookie('token', token, {
      maxAge: 600000000,
      httpOnly: true,
    }).json({isAuth: true, role: user.role})
  



  })
  


}

exports.signout = (req, res) => {
  res.clearCookie('token');

  res.json({
      message: "User Signout"
  })

} 



 
 




