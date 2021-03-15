const express=require('express');
const passport = require('passport');
const router=express.Router();
const Question=require('../database models/questions')
const User=require('../database models/userModel')
const nodemailer=require('nodemailer')
const fetch=require('node-fetch');
const bodyParser = require('body-parser');
const app=express()

function codechefMiddleware(req,res,next)
{
    const userEmail=req.user.email
    const code=req.body.code;
    User.findOne({email:userEmail})
    .then((foundUser)=>{
        if(!foundUser)
        {
            res.status(400).json({error: 'no such user found'})
        }

        var currentTime=Math.floor((new Date())/1000)
        console.log(currentTime)
        var expiryTime=Math.floor((new Date(foundUser.expiresIn))/1000)
        console.log(expiryTime)
        console.log(expiryTime <= currentTime)
        
        if(foundUser.accessToken == null)
        {
            console.log('y')
            fetch('https://api.codechef.com/oauth/token',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                grant_type:'authorization_code',
                code: code,
                client_id:process.env.CLIENT_ID_CODECHEF,
                client_secret:process.env.CLIENT_SECRET_CODECHEF,
                redirect_uri:'https://clashofcodes.herokuapp.com/codechefdone'
            })
            })
            .then(res=>res.json())
            .then((data)=>{
                // console.log(data)
        
                if(data.status === 'OK')
                {
                    foundUser.accessToken=data.result.data.access_token
                    foundUser.refreshToken=data.result.data.refresh_token
                    foundUser.expiresIn=new Date(currentTime*1000 + 118*60*1000);
                    foundUser.codechefVerified=true;
        
                    foundUser.save((savedUser)=>{
                        // return res.status(200).json(savedUser)
                        // req.accessToken=savedUser.accessToken;
                        next()
                    })
                }
                else
                {
                    return res.json(data)
                } 
            })
            .catch((err)=>{
                console.log(err)
            })
            
        }
        else
        {
            if(expiryTime <= currentTime)
            {
                console.log('t')
                fetch('https://api.codechef.com/oauth/token',{
                    method:'POST',
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    body:JSON.stringify({
                        grant_type:'refresh_token',
                        refresh_token: foundUser.refreshToken,
                        client_id:process.env.CLIENT_ID_CODECHEF,
                        client_secret:process.env.CLIENT_SECRET_CODECHEF,
                    })
                })
                .then(res=>res.json())
                .then((data)=>{
                    
                    console.log(data)
                    foundUser.accessToken=data.result.data.access_token
                    foundUser.refreshToken=data.result.data.refresh_token
                    foundUser.expiresIn=new Date(currentTime*1000 + 118*60*1000);
                    foundUser.codechefVerified=true;
        
                    foundUser.save((savedUser)=>{
                        // return res.status(200).json(savedUser)
                        // req.accessToken=savedUser.accessToken;
                        next()
                    })
                })
                
            }
            else
            next()
        }

    })

    // console.log(req.body.code)
    // console.log('reached here')
}

router.post('/codechef/accessToken',passport.authenticate('jwt',{session:false}),codechefMiddleware,(req,res)=>{
    return res.status(200).json(req.user)
})

router.get('/codechef/api/users/:handle',passport.authenticate('jwt',{session:false}),codechefMiddleware,(req,res)=>{
    var handle=req.params.handle;
    // console.log(handle)
    // console.log(req.accessToken)
    fetch(`https://api.codechef.com/users/${handle}`,{
        headers:{
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + req.user.accessToken
        }
    })
    .then(res=>res.json())
    .then((data)=>{
        console.log(data)
        return res.status(200).json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports=router;