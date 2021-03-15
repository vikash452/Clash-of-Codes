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
    ],
    vCode:{
        type:"String"
    },
    verified:{
        type:Boolean,
        default:false
    },
    forgotPassword:{
        type:String
    },
    accessToken:{
        type:String
    },
    refreshToken:{
        type:String
    },
    expiresIn:{
        type:Date
    },
    codechefVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const User=mongoose.model('User',UserSchema)
// export default User;
module.exports=User