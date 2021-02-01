const express=require('express')
const router=express.Router();
// import {User} from '../database models/userModel'
const User=require('../database models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const jwtStrategy=require('passport-jwt').Strategy;
const extractStrategy=require('passport-jwt').ExtractJwt;
const passport=require('passport')

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

router.get('/test',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log('test')
    console.log(req)
})

router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password)
    {
        return res.status(400).json({error:"invalid fields"})
    }

    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser)
        {
            return res.status(400).json({error:"user already exists"})
        }

        const newUser=new User({
            name,
            email,
            password
        })

        bcrypt.genSalt(5,(err,salt)=>{
            // console.log(salt)
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                newUser.password=hash
                if(err)
                {
                    res.status(400).json({error:err})
                }
                newUser.save()
                .then((data)=>{
                    return res.json(data)
                })
            })
        })
    })
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    User.findOne({email:email})
    .then((foundUser)=>{
        if(!foundUser)
        {
            return res.status(400).json({error:"no such user exists"})
        }

        bcrypt.compare(password,foundUser.password,(err,same)=>{
            // console.log(same)
            if(!same)
            {
                return res.status(400).json({error:"incorrect password"})
            }
            
            const token=jwt.sign({email:foundUser.email},'secret');
            return res.status(200).json({message:token})

        })

    })
})

// export default router;
module.exports=router