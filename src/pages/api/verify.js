import { verifyToken } from "../../database/jsonwebtoken";
import path from 'path'
import fs from 'fs/promises'

// Función para verificar el encabezado de autorización y extraer el token
const getAuthToken = (authHeader) => {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  if (parts.length === 2 && parts[0] === "Bearer") return parts[1];
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
    const token = getAuthToken(authHeader);
    if (!token) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "error en el encabezado",
        })
      );
    }
    const decodificacion = await verifyToken(token);
    const credencialEncontrada = dataBase?.credenciales.find((cred) => cred.uid == decodificacion.uid);
    if (!credencialEncontrada) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "QR Invalido",
        })
      );
    }
    if (!credencialEncontrada.estado) {
      return new Response(
        JSON.stringify({
          status: 500,
          message: "QR ya Ingresado",
        })
      );  
    }
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
