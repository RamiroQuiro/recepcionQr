import { verifyToken } from "../../database/jsonwebtoken";
import path from "path";
import fs from "fs/promises";

function generarUID() {
  return Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
}


// Función para verificar el encabezado de autorización y extraer el token y exrtraer el uidEvento
const getAuthToken = (authHeader) => {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  if (parts.length === 4 && parts[0] === "Bearer")
    return { token: parts[1], uidEvento: parts[3] };
  return null;
};

export const GET = async ({ request }) => {
  try {
    // Define la ruta del archivo
    const filePathData = path.join(
      process.cwd(),
      "public",
      "base",
      "base.json"
    );
    // Lee el archivo y parsea el contenido a un array
    const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));
    // Obtén el encabezado de autorización
    const authHeader = request.headers.get("Authorization");
    const { token, uidEvento } = getAuthToken(authHeader);
console.log('endpoint -> otken:',token, '    uidEvento->',uidEvento)
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
    const credencialEncontrada = dataBase?.credenciales.find(
      (cred) => cred.uid == decodificacion.uid
    );
    const eventoCorrespontiente = dataBase?.eventos.find(
      (evento) => evento.uid == uidEvento
    );

    // Verifica si la credencial existe
    if (!credencialEncontrada) {
      return new Response(
        JSON.stringify({
          status: 405,
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
          decodificacion: {
            evento: decodificacion.evento,
            video: decodificacion.video,
            nombreApellido: decodificacion.name,
            invitados: decodificacion.invitados,
          },
        })
      );
    }

    // Actualiza el estado de la credencial
    credencialEncontrada.estado = false;
    eventoCorrespontiente.checkIn.push({
      uid: generarUID(),
      nombreApellido: decodificacion.name,
      uidInvitado: decodificacion.uid,
      hora: new Date().toLocaleTimeString(),
      invitados: decodificacion.invitados
    });


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
