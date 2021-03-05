const express=require('express')
const router=express.Router();
// import {User} from '../database models/userModel'
const User=require('../database models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const jwtStrategy=require('passport-jwt').Strategy;
const extractStrategy=require('passport-jwt').ExtractJwt;
const passport=require('passport')
const nodemailer = require('nodemailer')
const crypto=require('crypto')

var options={
    jwtFromRequest:extractStrategy.fromAuthHeaderAsBearerToken(),
    secretOrKey:"secret"
}

passport.use(new jwtStrategy(options,(jwt_payload,done)=>{
    User.findOne({email:jwt_payload.email})
    .then((foundUser)=>{
        return done(null,foundUser)
    })
    .catch((err)=>{
        return done(err,false)
    })
}))

router.get('/user/test',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log('test')
    // console.log(req)
})

router.post('/user/verifyCode',(req,res)=>{
    // const code='abcd';
    const {name,email,password,code}=req.body;
    if(!name || !email || !password || !code)
    {
        return res.status(400).json({error:"invalid fields"})
    }

    User.findOne({email})
    .then((savedUser)=>{
        if(!savedUser)
        {
            return res.status(400).json({error:'verification code not generated'})
        }

        if(savedUser.verified === true)
            return res.status(400).json({error:"user already exists"})

        if(savedUser.vCode !== code)
            return res.status(401).json({error:"invalid verification code"})
        
        bcrypt.genSalt(5,(err,salt)=>{
            // console.log(salt)
            bcrypt.hash(password,salt,(err,hash)=>{
                savedUser.password=hash
                if(err)
                {
                    res.status(400).json({error:err})
                }
                savedUser.name=name;
                savedUser.verified=true
                savedUser.save()
                .then((data)=>{
                    return res.json(data)
                })
            })
        })
            
    })

})

router.post('/user/signup',(req,res)=>{
    const {name,email}=req.body;
    
    if(!email.endsWith('@gmail.com') && !email.endsWith('@dtu.ac.in'))
    {
        return res.status(400).json({error:"invalid email id"})
    }

    if(!name || !email)
    {
        return res.status(400).json({error:"invalid fields"})
    }

    User.findOne({email:email})
    .then((savedUser)=>{

        var randomCode=crypto.randomBytes(3).toString('hex')
        console.log(randomCode)

        if(savedUser)
        {
            if(savedUser.verified === true)
                return res.status(400).json({error:"user already exists"})
            else
            {
                savedUser.vCode=randomCode;
                savedUser.save()
            }
        }
        else
        {
            const newUser=new User({
                email,
                vCode:randomCode,
                verified:false
            })
    
            newUser.save()
        }

           
        var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: process.env.GMAIL_ID,
              pass: process.env.GMAIL_PASSWORD,
            },
          });
        
          var mailOptions = {
            from: process.env.GMAIL_ID,
            to: email,
            subject: "Verification Code for signup",
            html: `
            <h2>Hi! ${name}</h2>
            <h3>Welcome to Clash of Codes</h3>
            Your verification code to sign up is: ${randomCode}
            `,
          };
        
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            return res.json({message:"verification code sent to your email"})
            }
        });
        // return res.json({message:"verification code sent to your email"})
        // bcrypt.genSalt(5,(err,salt)=>{
        //     // console.log(salt)
        //     bcrypt.hash(newUser.password,salt,(err,hash)=>{
        //         newUser.password=hash
        //         if(err)
        //         {
        //             res.status(400).json({error:err})
        //         }
        //         newUser.save()
        //         .then((data)=>{
        //             return res.json(data)
        //         })
        //     })
        // })
    })
})

router.post('/user/signin',(req,res)=>{
    // console.log(req.body)
    const {email,password}=req.body;
    User.findOne({email:email})
    .then((foundUser)=>{
        // foundUser null nhi hoga
        if(!foundUser)
        {
            return res.status(400).json({error:"no such user exists"})
        }

        // abc
        // 4gvgshfr67sug

        bcrypt.compare(password,foundUser.password,(err,same)=>{
            // console.log(same)
            if(!same)
            {
                return res.status(400).json({error:"incorrect password"})
            }
            
            const token=jwt.sign({email:foundUser.email},'secret');
            const userDetails={
                token:token,
                foundUser,
            }
            return res.status(200).json(userDetails)

        })

    })
})

router.post('/user/forgotPassword',(req,res)=>{
    const email=req.body.email;
    User.findOne({email:email})
    .then((foundUser)=>{
        if(!foundUser)
        {
            return res.status(400).json({error:'no such user found'})
        }

        var randomCode=crypto.randomBytes(10).toString('hex')  
        foundUser.forgotPassword=randomCode;
        foundUser.save()
        .then((updated)=>{

            var transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                  user: process.env.GMAIL_ID,
                  pass: process.env.GMAIL_PASSWORD,
                },
            });

            var mailOptions = {
                from: process.env.GMAIL_ID,
                to: updated.email,
                subject: "Forgot password link",
                html: `
                <h2>Hi! ${updated.name}</h2>
                <h3>Forgot your password??</h3>
                <h4> No worries, we have coded to give you a  cover .... xD </h4>
                Proceed to <a href='http://clashofcodes.herokuapp.com/updatePassword/${randomCode}'>this link</a> to reset you password
                `,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                return res.json({message:"verification code sent to your email"})
                }
            });
        })      

    })
})

router.post('/user/updatePassword',(req,res)=>{
    var email=req.body.email
    var verification=req.body.verification
    var password=req.body.password

    User.findOne({email:email})
    .then((foundUser)=>{
        if(!foundUser)
        {
            return res.status(400).json({error:'no such user found'})
        }

        bcrypt.genSalt(5,(err,salt)=>{
            bcrypt.hash(password,salt,(err,hash)=>{
                foundUser.password=hash
                foundUser.verification=null
                if(err){
                    return res.status(400).json({error:err})
                }

                foundUser.save()
                .then((password_update_done)=>{
                    res.status(200).json(password_update_done)
                })
            })
        })

    })
    
})

router.get('/user/logout',(req,res)=>{
    req.logOut()
    res.json({message:"logged out successfully"});
})

// export default router;
module.exports=router