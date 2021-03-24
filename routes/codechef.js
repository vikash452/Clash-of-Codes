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
    // console.log('a')
    const userEmail=req.user.email
    const code=req.body.code;
    User.findOne({email:userEmail})
    .then((foundUser)=>{
        if(!foundUser)
        {
            res.status(400).json({error: 'no such user found'})
        }

        var currentTime=Math.floor((new Date())/1000)
        // console.log(currentTime)
        var expiryTime=Math.floor((new Date(foundUser.expiresIn))/1000)
        // console.log(expiryTime)
        // console.log(expiryTime <= currentTime)
        
        if(foundUser.accessToken == null)
        {
            // console.log('y')
            fetch('https://api.codechef.com/oauth/token',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                grant_type:'authorization_code',
                code: code,
                client_id:process.env.CLIENT_ID_CODECHEF_PRACTICE,
                client_secret:process.env.CLIENT_SECRET_CODECHEF_PRACTICE,
                redirect_uri:process.env.REDIRECT_URI_PRACTICE
            })
            })
            .then(res=>res.json())
            .then((data)=>{
                // console.log(data)
        
                if(data.status === 'OK')
                {
                    foundUser.accessToken=data.result.data.access_token
                    foundUser.refreshToken=data.result.data.refresh_token
                    foundUser.expiresIn=new Date(currentTime*1000 + 58*60*1000);
                    foundUser.codechefVerified=true;
        
                    foundUser.save()
                    .then((savedUser)=>{
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
                console.log('initial')
                console.log(req.user)
                fetch('https://api.codechef.com/oauth/token',{
                    method:'POST',
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    body:JSON.stringify({
                        grant_type:'refresh_token',
                        refresh_token: foundUser.refreshToken,
                        client_id:process.env.CLIENT_ID_CODECHEF_PRACTICE,
                        client_secret:process.env.CLIENT_SECRET_CODECHEF_PRACTICE,
                    })
                })
                .then(res=>res.json())
                .then((data)=>{
                    
                    console.log(data)
                    foundUser.accessToken=data.result.data.access_token
                    foundUser.refreshToken=data.result.data.refresh_token
                    foundUser.expiresIn=new Date(currentTime*1000 + 58*60*1000);
                    foundUser.codechefVerified=true;
        
                    foundUser.save()
                    .then((savedUser)=>{
                        console.log('final')
                        console.log(savedUser)
                        // req.logIn(savedUser,(err)=>{
                        //     if(!err)
                        //     {
                        //         next()
                        //     }
                        // })
                        next()
                    })
                })
                
            }
            else
            next()
        }
    })
}

router.post('/codechef/accessToken',passport.authenticate('jwt',{session:false}),codechefMiddleware,(req,res)=>{
    // console.log(req.user)
    // console.log('b')
    return res.status(200).json(req.user)
})

// codechefMiddleware
router.get('/codechef/api/users/:handle',passport.authenticate('jwt',{session:false}),(req,res)=>{
    
    var resultTemp={
        "status": "OK",
        "result": {
          "data": {
            "content": {
              "username": "invincible28",
              "fullname": "Shubhang Jyotirmay",
              "country": {
                "name": "India"
              },
              "state": {
                "name": "Delhi"
              },
              "city": {
                "name": "New Delhi"
              },
              "rankings": {
                "allContestRanking": {
                  "global": 31421,
                  "country": 24885
                },
                "longRanking": {
                  "global": 40117,
                  "country": 32857
                },
                "shortRanking": {
                  "global": 24249,
                  "country": 19140
                },
                "ltimeRanking": {
                  "global": 0,
                  "country": 0
                },
                "allSchoolRanking": {
                  "global": 0,
                  "country": 0
                },
                "longSchoolRanking": {
                  "global": 0,
                  "country": 0
                },
                "shortSchoolRanking": {
                  "global": 0,
                  "country": 0
                },
                "ltimeSchoolRanking": {
                  "global": 0,
                  "country": 0
                }
              },
              "ratings": {
                "allContest": 1697,
                "long": 1613,
                "short": 1566,
                "lTime": 0,
                "allSchoolContest": 0,
                "longSchool": 0,
                "shortSchool": 0,
                "lTimeSchool": 0
              },
              "occupation": "Student",
              "organization": "Delhi Technological University",
              "problemStats": {
                "partiallySolved": {
                  "JAN21C": [
                    "ANTSCHEF",
                    "ORAND"
                  ],
                  "LTIME92B": [
                    "DREDIV"
                  ]
                },
                "solved": {
                  "JAN21C": [
                    "ANTSCHEF",
                    "WIPL",
                    "FAIRELCT",
                    "ORAND",
                    "DIVTHREE",
                    "BILLRD",
                    "DECODEIT"
                  ],
                  "FEB21B": [
                    "FROGS",
                    "TEAMNAME",
                    "PRIGAME",
                    "MAXFUN"
                  ],
                  "COOK125B": [
                    "SDSTRING",
                    "CATHIEF",
                    "ATTENDU"
                  ],
                  "LTIME91B": [
                    "THREE",
                    "SEDARR",
                    "SWAP10HG"
                  ],
                  "COOK126B": [
                    "PTUPLES",
                    "MINIL"
                  ],
                  "LTIME92B": [
                    "DREDIV",
                    "BINSUBS",
                    "EVENDIFF",
                    "EVENGAME"
                  ]
                },
                "attempted": {
                  "JAN21C": [
                    "ANTSCHEF",
                    "WIPL",
                    "BLKJK",
                    "ORAND"
                  ],
                  "COOK126B": [
                    "PTUPLES",
                    "MINIL"
                  ],
                  "COOK125B": [
                    "CATHIEF",
                    "SDSTRING"
                  ],
                  "LTIME91B": [
                    "SWAP10HG",
                    "THREE"
                  ],
                  "LTIME92B": [
                    "GOODGRID"
                  ],
                  "FEB21B": [
                    "TEAMNAME",
                    "PRIGAME"
                  ]
                }
              },
              "submissionStats": {
                "partiallySolvedProblems": 3,
                "solvedProblems": 23,
                "attemptedProblems": 13,
                "submittedSolutions": 73,
                "wrongSubmissions": 33,
                "runTimeError": 0,
                "timeLimitExceed": 4,
                "compilationError": 0,
                "partiallySolvedSubmissions": 8,
                "acceptedSubmissions": 28
              },
              "language": "C++17",
              "band": "3★"
            },
            "code": 9001,
            "message": "user detail successfully fetched"
          }
        }
      }

    return res.status(200).json(resultTemp)

    var handle=req.params.handle;

    User.findOne({email:req.user.email})
    .then((foundUser)=>{
        console.log('token in use')
        console.log(foundUser)
        fetch(`https://api.codechef.com/users/${handle}`,{
            headers:{
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + foundUser.accessToken
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
    .catch((err)=>{
        console.log(err)
    })

    // console.log(handle)
    // console.log(req.accessToken)
    // console.log('now')
    // console.log(req.user)
    
})

module.exports=router;