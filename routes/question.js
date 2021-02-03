const express=require('express');
const passport = require('passport');
const router=express.Router();
const {Question}=require('../database models/questions')

router.get('/question/test',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log('test passed')
})

router.post('/question/add',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
})


module.exports=router;