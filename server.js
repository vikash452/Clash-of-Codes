const express = require('express')
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const app=express();
require('dotenv').config();
const jwtStrategy=require('passport-jwt').Strategy;
const extractStrategy=require('passport-jwt').ExtractJwt;
const passport=require('passport')
const PORT = process.env.PORT || 5000 ;
const cors=require('cors')
const cookieSession=require('cookie-session')
require('./routes/passport')

mongoose.connect('mongodb://localhost:27017/ClashOfCodes',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false} );
// mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false} )
mongoose.connection.on('connected',()=>{
    console.log('connected to database')
})
mongoose.connection.on('error',()=>{
    console.log('failed to connect to database')
})

app.use(cookieSession({
    maxAge:30*24*60*60*1000,
    keys:['abcd']
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())
app.use(require('./routes/authentication'))
app.use(require('./routes/platformHandles'))
app.use(require('./routes/question'))
app.use(require('./routes/contest'))
app.use(require('./routes/user'))
app.use(require('./routes/codechef'))

// app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}),(req,res)=>{
//     console.log('here')
//     res.json({ok:'ok'})
// })

// app.get('/auth/google/callback',(req,res)=>{
//     console.log('here2')
//     res.json(req.user)
// })

if(process.env.NODE_ENV=='production')
{
    app.use(express.static('client/build'))
    const path=require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log('server started on port 5000')
})