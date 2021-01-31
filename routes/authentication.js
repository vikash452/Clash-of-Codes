const express=require('express')
const router=express.Router();
// import {User} from '../database models/userModel'
const User=require('../database models/userModel')
const bcrypt=require('bcrypt')

router.get('/test',(req,res)=>{
    console.log('test')
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

            return res.status(200).json({message:"welcome"})

        })

    })
})

// export default router;
module.exports=router