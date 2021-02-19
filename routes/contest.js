const express=require('express');
const passport = require('passport');
const router=express.Router();
const Question=require('../database models/questions')
const User=require('../database models/userModel')
const Contest=require('../database models/contest')
const crypto = require('crypto')

router.get('/contest/test',(req,res)=>{
    res.json({message:"verified"})
})

router.get('contest/joinRoom/:roomId',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const roomId=req.query.roomId;
    Contest.findOne({roomId:roomId})
    .then((foundRoom)=>{
        if(!foundRoom)
        {
            res.status(400).json({error:"no such room found"})
        }

        res.status(200).json({room:foundRoom})
    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports=router;