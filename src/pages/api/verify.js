import { verifyToken } from "../../database/jsonwebtoken";
import path from 'path'
import fs from 'fs/promises'

export const GET = async ({ request }) => {
  try {
    // Define la ruta del archivo
    const filePathData = path.join(process.cwd(),"public","base","base.json");
    // Lee el archivo y parsea el contenido a un array
    const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));
    // Obtén el encabezado de autorización
    const authHeader = request.headers.get("Authorization");
    let decodificacion;
    // Si el encabezado de autorización está presente, extrae el token
    let token;
    if (authHeader) {
      // El formato del encabezado de autorización debería ser 'Bearer <token>'
      const parts = authHeader.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts[1];
        decodificacion = await verifyToken(token);
        console.log(dataBase)
        const credencialEncontrada = dataBase?.credenciales.find((cred) => cred.uid == decodificacion.uid);
        if (credencialEncontrada) {
            console.log(credencialEncontrada)
          credencialEncontrada.estado = false;
          const jsonData = JSON.stringify(dataBase);
          // Escribe el array actualizado de vuelta al archivo
          await fs.writeFile(filePathData, jsonData);
        }
      } else {
        return new Reponse(
          JSON.stringify({
            status: 400,
            message: "error en el encabezado",
          })
        );
      }
      return new Response(
        JSON.stringify({
          status: 200,
          message: "exitoso",
          decodificacion,
        })
      );
    }

    // Aquí puedes verificar el token y procesarlo como necesites

    return new Response(
      JSON.stringify({
        status: 200,
        message: "enviado",
      })
    );
  } catch (error) {
    console.error(error);
  }
};
