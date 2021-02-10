const express=require('express');
const passport = require('passport');
const router=express.Router();
const Question=require('../database models/questions')
const User=require('../database models/userModel')

router.put('/user/addFriend/:friendEmail',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const friendEmail=req.query.friendEmail;
    
})

module.exports=router;