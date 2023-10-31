
export async function GET() {
conexion()

    return {
        body:JSON.stringify({
            name:"ramaQuiroga"
        })
    }
}