const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types

const contestSchema=new mongoose.Schema({
    roomId:{
        type: String
    },
    name:{
        type:String
    },
    participants:[
        {
            type:ObjectId,
            ref:"User"
        }
    ],
    admin:{
        type:ObjectId,
        ref:"User"
    },
    timeOfCreation:{
        type:Date
    },
    expiry:{
        type:Date
    }
},{timestamps:true})

const Contest=mongoose.model('Contest',contestSchema)
// export default User;
module.exports=Contest