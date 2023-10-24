import { conexion } from "../../database/conexion";
import Videos from "../../models/Videos";

export async function GET() {
    conexion()
const videos=await Videos.find()
console.log()
    return {
        body:JSON.stringify(videos)
    }
}