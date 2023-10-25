import { conexion } from "../../database/conexion";
import Videos from "../../models/Videos";

export async function GET() {
    conexion()
const videos=await Videos.find()
console.log(videos)
    return {
        body:JSON.stringify(videos)
    }
}