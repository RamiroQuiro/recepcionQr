import { Schema,model } from "mongoose";


const videosSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    description:String,
    done:Boolean,
    path:String,

},{
    timestamps:true
})


export default model('Video',videosSchema)

