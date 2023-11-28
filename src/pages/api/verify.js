import { verifyToken } from "../../database/jsonwebtoken";
import path from 'path'
import fs from 'fs/promises'

// Función para verificar el encabezado de autorización y extraer el token y exrtraer el uidEvento
const getAuthToken = (authHeader) => {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  if (parts.length === 4 && parts[0] === "Bearer") return {token:parts[1],uidEvento:parts[3]};
  return null;
};



export const GET = async ({ request }) => {
  try {
    // Define la ruta del archivo
    const filePathData = path.join(process.cwd(),"public","base","base.json");
    // Lee el archivo y parsea el contenido a un array
    const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));
    // Obtén el encabezado de autorización
    const authHeader = request.headers.get("Authorization");
    const {token,uidEvento} = getAuthToken(authHeader);

    // Verifica si el token existe
    if (!token) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "error en el encabezado",
        })
      );
    }

    // Verifica el token
    const decodificacion = await verifyToken(token);


    // Busca la credencial en la base de datos
    const credencialEncontrada = dataBase?.credenciales.find((cred) => cred.uid == decodificacion.uid);
    // Verifica si la credencial existe
    if (!credencialEncontrada) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "QR Invalido",
        })
      );
    }

    // Verifica si el evento corresponde
    if (credencialEncontrada.evento !== uidEvento) {
      return new Response(
        JSON.stringify({
          status: 500,
          message: "QR no corresponde a este evento",
         
        })
      );  
    }

    // Verifica si la credencial ya fue usada
    if (!credencialEncontrada.estado) {
      return new Response(
        JSON.stringify({
          status: 205,
          message: "QR ya Ingresado",
          decodificacion:{
            evento:decodificacion.evento,
            video:decodificacion.video,
            nombreApellido:decodificacion.nombreApellido,
            invitados:decodificacion.invitados
          }
        })
      );  
    }

    // Actualiza el estado de la credencial
    credencialEncontrada.estado = false;
   
    const jsonData = JSON.stringify(dataBase);
    // Escribe el array actualizado de vuelta al archivo
    await fs.writeFile(filePathData, jsonData);
    
    return new Response(
      JSON.stringify({
        status: 200,
        message: "exitoso",
        decodificacion,
      })
    );
  } catch (error) {
    console.error(error);
  }
};
