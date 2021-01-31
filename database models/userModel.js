const mongoose=require('mongoose')
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
    codeforcesHandle:{
        type:String
    },
    codechefHandle:{
        type:String
    },
    leetCodeHandle:{
        type:String
    }
},{timestamps:true})

const User=mongoose.model('User',UserSchema)
export default User;