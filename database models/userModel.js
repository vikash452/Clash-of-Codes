const mongoose=require('mongoose')
const {Question}=require('./questions')
const {ObjectId} = mongoose.Schema.Types
const UserSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    codeforces:{
        type:String
    },
    codechef:{
        type:String
    },
    leetCode:{
        type:String
    },
    dsaQuestion:[
        {
            type:ObjectId,
            ref:"Question"
        }
    ],
    friends:[
        {
            type:ObjectId,
            ref:"User"
        }
    ]
},{timestamps:true})

const User=mongoose.model('User',UserSchema)
// export default User;
module.exports=User