const express=require('express');
const passport = require('passport');
const router=express.Router();
const User=require('../database models/userModel')

router.get('/test2',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log('test')
    console.log(req)
})

// route to set handles of various platforms
router.post('/post/handles',passport.authenticate('jwt',{session:false}),(req,res)=>{
    // console.log(req.user.email)
    const {platform,handle}=req.body;
    const userEmail=req.user.email
    User.findOne({email:userEmail})
    .then((user)=>{
        if(!user)
        {
            return res.status(400).json({error:"no such user found"});
        }

        switch(platform)
        {
            case "codeforces":user.codeforces=handle
            break;
            case "codechef":user.codechef=handle
            break;
            case "leetcode":user.leetcode=handle
            break;
            default:user=user
        }
        
        user.save()
        .then((savedUser)=>{
            return res.status(200).json(savedUser)
        })
        .catch((err)=>{
            console.log(err)
        })

    })
})

router.get('/get/handleName/:platformName',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const userEmail=req.user.email
    const platform=req.params.platformName
    User.findOne({email:userEmail})
    .then((user)=>{
        if(!user)
        {
            return res.status(400).json({error:"no such user found"});
        }

        
        switch(platform)
        {
            case "codeforces":{
                if(!user.codeforces)
                return res.status(400).json({error:"codeforces handle not added"})

                return res.status(200).json({handle:user.codeforces})
                break;
            }
            case "codechef":{
                if(!user.codechef)
                return res.status(400).json({error:"codechef handle not added"})

                return res.status(200).json({handle:user.codechef})
                break;
            }
            case "leetcode":{
                if(!user.leetcode)
                return res.status(400).json({error:"leetcode handle not added"})

                return res.status(200).json({handle:user.leetcode})
                break;
            }
            default:{
                return res.status(400).json({error:"invalid platform name"})
            }
        }


    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports=router
