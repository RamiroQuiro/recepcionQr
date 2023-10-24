import { conexion } from "../../database/conexion";

export async function GET() {
conexion()

    return {
        body:JSON.stringify({
            name:"ramaQuiroga"
        })
    }
}