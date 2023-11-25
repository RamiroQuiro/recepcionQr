import { verifyToken } from "../../database/jsonwebtoken";

export const GET = async ({ request }) => {
    try {
        // Obtén el encabezado de autorización
        const authHeader = request.headers.get('Authorization');
let decodificacion;
        // Si el encabezado de autorización está presente, extrae el token
        let token;
        if (authHeader) {
            // El formato del encabezado de autorización debería ser 'Bearer <token>'
            const parts = authHeader.split(' ');
            if (parts.length === 2 && parts[0] === 'Bearer') {
                token = parts[1];
                decodificacion=await verifyToken(token)
            }else{
                return new Reponse(JSON.stringify({
                    status:400,
                    message:"error en el encabezado"
                }))
            }
            return new Response(JSON.stringify({
                status:200,
                message:"exitoso",
                decodificacion,
            }))
        }
  
        // Aquí puedes verificar el token y procesarlo como necesites
  
        return new Response(JSON.stringify({
            status: 200,
            message: "enviado"
        }));
    } catch (error) {
        console.error(error);
    }
  };
  