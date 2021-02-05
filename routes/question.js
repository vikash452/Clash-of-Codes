const express=require('express');
const passport = require('passport');
const router=express.Router();
const Question=require('../database models/questions')

router.get('/question/test',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log('test passed')
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

router.get('/getQuestion',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const topic=req.query.topic;
    const difficulty=req.query.difficulty;
    console.log(typeof(difficulty))

    if(difficulty === undefined)
    {
        Question.find({topic:topic})
        .then((foundQuestion)=>{
            // console.log(foundQuestion)
            return res.status(200).json(foundQuestion)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    Question.find({$and:[{topic:topic},{difficulty:difficulty}]})
    .then((foundQuestion)=>{
        // console.log(foundQuestion)
        return res.status(200).json(foundQuestion)
    })
    .catch((err)=>{
        console.log(err)
    })

})

router.post('/markAsDone',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log(req.user.dsaQuestion)
    Question.findById(req.body.id)
    .then((questionToPush)=>{
        if(!questionToPush)
        {
            return res.status(400).json({error:"invalid question id"})
        }
        req.user.dsaQuestion.push(questionToPush)
        return res.status(200).json(req.user.dsaQuestion)
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/solvedQuestions',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
})

module.exports=router;