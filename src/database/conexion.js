import {connect} from "mongoose";


export const conexion=async()=>{

    try {
        const db=await connect("mongodb://localhost:27017/test")
    
        console.log('DB connected to',db.connection.name)    
    } catch (error) {
        console.log(error)
    }
    
}