const express=require('express');
const passport = require('passport');
const router=express.Router();
const Question=require('../database models/questions')
const User=require('../database models/userModel')

router.get('/question/test',(req,res)=>{
    console.log('test passed')
    return res.json({message:"test passed"})
})

router.post('/question/add',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {name,difficulty,url,topic}=req.body;
    Question.findOne({url:url})
    .then((foundQuestion)=>{
        if(foundQuestion)
        {
            return res.status(400).json({error:"question with such url already exists:",question:foundQuestion})
        }
        const newQuestion=new Question({
            questionName:name,
            difficulty,
            url,
            topic
        })
        newQuestion.save()
        .then((savedQuestion)=>{
            return res.status(200).json({question:savedQuestion})
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/question/getQuestion',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const topic=req.query.topic;
    const difficulty=req.query.difficulty;
    // console.log(typeof(difficulty))
    // console.log(req.query)

    // if(difficulty === undefined)
    // {
    //     Question.find({topic:topic})
    //     .then((foundQuestion)=>{
    //         // console.log(foundQuestion)
    //         return res.status(200).json(foundQuestion)
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    // }
    
    Question.find({$and:[{topic:topic},{difficulty:difficulty}]})
    .then((foundQuestion)=>{
        // console.log(foundQuestion)
        return res.status(200).json(foundQuestion)
    })
    .catch((err)=>{
        console.log(err)
    })

})

router.post('/question/markAsDone',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(req.user.dsaQuestion.includes(req.body.id))
    {
        return res.status(400).json({error:"question already marked as done"});
    }
    User.findByIdAndUpdate(req.user.id,{
        $push:{dsaQuestion:req.body.id}
    },{
        new:true
    })
    .populate({
        path:'dsaQuestion',
        model:'Question',
        select:'questionName difficulty url topic'
    })
    .then((updatedUser)=>{
        // console.log(updatedUser)
        res.json(updatedUser)
    })

})

router.post('/question/undone',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(!req.user.dsaQuestion.includes(req.body.id))
    {
        return res.status(400).json({error:"question haven't done before"});
    }

    User.findByIdAndUpdate(req.user.id,{
        $pull:{dsaQuestion:req.body.id}
    },{
        new:true
    })
    .populate({
        path:'dsaQuestion',
        model:'Question',
        select:'questionName difficulty url topic'
    })
    .then((updatedUser)=>{
        res.status(200).json(updatedUser)
    })
    .catch((err)=>{
        console.log(err)
    })

})

router.get('/question/solvedQuestions',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const email=req.user.email;
    User.findOne({email})
    .populate({
        path:'dsaQuestion',
        model:'Question',
        select:'questionName difficulty url topic'
    })
    .then((foundUser)=>{
        if(!foundUser)
        {
            return res.status(400).json({error:"no such user exists"})
        }
        return res.status(200).json(foundUser.dsaQuestion);
    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports=router;