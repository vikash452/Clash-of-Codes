const express=require('express');
const passport = require('passport');
const router=express.Router();
const Question=require('../database models/questions')
const User=require('../database models/userModel')
const nodemailer=require('nodemailer')

router.put('/user/addFriend/:friendID',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const friendID=req.params.friendID;

    User.findOneAndUpdate({email:req.user.email},{
        $push:{friends:friendID}
    },{
        new:true
    })
    .populate({
        path:'friends',
        model:'User',
        select:'email name codeforces codechef'
    })
    .then((updatedUser)=>{
        return res.status(200).json(updatedUser)
    })
    .catch((err)=>{
        console.log(err)
    })
    
})

router.get('/user/searchFriend/:friend',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log(req.params.friend)
    var friendPattern=new RegExp('^' + req.params.friend)
    console.log(friendPattern)
    User.find({name:{$regex:friendPattern}})
    .then((friend)=>{
        if(!friend)
        {
            return res.status(400).json({error:'no user found'})
        }
        res.status(200).json(friend)
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.put('/user/removeFriend/:friendID',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const friendID=req.params.friendID

    User.findOneAndUpdate({email:req.user.email},{
        $pull:{friends:friendID}
    },{
        new:true
    })
    .populate({
        path:'friends',
        model:'User',
        select:'email name codeforces codechef'
    })
    .then((updatedUser)=>{
        return res.status(200).json(updatedUser)
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.post('/user/submitQuery',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const userQuery=req.body.userQuery;
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.GMAIL_PASSWORD,
        },
    });

    var mailOptions = {
        from: req.user.email,
        to: process.env.GMAIL_ID,
        subject: "User query/feedback",
        html: `
        Received from : ${req.user.name} , ${req.user.email}
        Query/Feedback : ${userQuery}
        `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.json({error:'Error!! Query/Feedback not submitted'})
        } else {
          console.log("Email sent: " + info.response);
        return res.status(200).json({message:"Query submitted successfully"})
        }
    });
})

module.exports=router;