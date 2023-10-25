import { Schema,model } from "mongoose";


const videosSchema=new Schema({
    titleVideo:{
        type:String,
        require:true
    },
    descripcionVideo:String,
    path:{
        type:String
    },
    file:{
        type:Object
    },
    originalname:String,
    mimetype:String,
    done:{
        type:Boolean,
        default:false,
    },
 

},{
    timestamps:true
})


export default model('Video',videosSchema)

