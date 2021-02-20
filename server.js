const express = require('express')
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const app=express();
require('dotenv').config();
const jwtStrategy=require('passport-jwt').Strategy;
const extractStrategy=require('passport-jwt').ExtractJwt;
const passport=require('passport')
// const User=require('../database models/userModel')
const PORT = 5000 || process.env.PORT;

// mongoose.connect('mongodb://localhost:27017/ClashOfCodes',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false} );
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false} )
mongoose.connection.on('connected',()=>{
    console.log('connected to database')
})
mongoose.connection.on('error',()=>{
    console.log('failed to connect to database')
})

// var options={
//     jwtFromRequest:extractStrategy.fromAuthHeaderAsBearerToken(),
//     secretOrKey:"secret"
// }

// passport.use(new jwtStrategy(options,(jwt_payload,done)=>{
//     User.findOne({email:jwt_payload.email})
//     .then((foundUser)=>{
//         return done(null,foundUser)
//     })
//     .catch((err)=>{
//         return done(err,false)
//     })
// }))

app.use(bodyParser.json())
app.use(require('./routes/authentication'))
app.use(require('./routes/platformHandles'))
app.use(require('./routes/question'))
app.use(require('./routes/contest'))

if(process.env.NODE_ENV=='production')
{
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(__dirname + '/client/build/index.html')
    })
}



app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(PORT,()=>{
    console.log('server started on port 5000')
})