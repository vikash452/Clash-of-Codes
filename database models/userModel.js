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
    codeforces:{
        type:String
    },
    codechef:{
        type:String
    },
    leetCode:{
        type:String
    }
},{timestamps:true})

const User=mongoose.model('User',UserSchema)
// export default User;
module.exports=User