const express = require('express')
const bodyParser = require('body-parser')
const app=express();
require('dotenv').config();
const PORT = 3000 || process.env.PORT;

app.listen(PORT,()=>{
    console.log('server started on port 3000')
})