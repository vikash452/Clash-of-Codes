const express = require('express')
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const app=express();
require('dotenv').config();
const PORT = 3000 || process.env.PORT;

mongoose.connect('mongodb://localhost:27017/ClashOfCodes',{useNewUrlParser:true,useUnifiedTopology:true} );
mongoose.connection.on('connected',()=>{
    console.log('connected to database')
})
mongoose.connection.on('error',()=>{
    console.log('failed to connect to database')
})

app.use(bodyParser.json())
app.use(require('./routes/authentication'))

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(PORT,()=>{
    console.log('server started on port 3000')
})