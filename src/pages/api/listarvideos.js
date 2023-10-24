import { conexion } from "../../database/conexion";
import Videos from "../../models/Videos";

export async function GET() {
const videos=await Videos.find()
console.log(videos.map((video)=>(video.titleVideo)))
    return {
        body:JSON.stringify(videos)
    }
}