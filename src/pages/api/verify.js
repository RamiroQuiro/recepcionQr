import { verifyToken } from "../../database/jsonwebtoken";
import path from "path";
import fs from "fs/promises";

function generarUID() {
  return Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
}  // Genera un identificador único de 4 dígitos

// Función para verificar el encabezado de autorización y extraer el token y el uidEvento
const getAuthToken = (authHeader) => {
  if (!authHeader) return null;  // Devuelve nulo si no hay encabezado de autorización
  const parts = authHeader.split(" ");
  if (parts.length === 4 && parts[0] === "Bearer")  // Verifica si el encabezado es válido
    return { token: parts[1], uidEvento: parts[3] };  // Devuelve el token y el uidEvento
  return null;  // Devuelve nulo si el encabezado no es válido
};

export const GET = async ({ request }) => {
  try {
    // Define la ruta del archivo
    const filePathData = path.join(
      process.cwd(),
      "public",
      "base",
      "base.json"
    );  // Ruta del archivo base.json
    // Lee el archivo y parsea el contenido a un array
    const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));  // Lee y parsea el archivo base.json
    // Obtén el encabezado de autorización
    const authHeader = request.headers.get("Authorization");
    const { token, uidEvento } = getAuthToken(authHeader);  // Obtiene el token y el uidEvento del encabezado de autorización

    // Verifica si el token existe
    if (!token) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "error en el encabezado",
        })
      );  // Devuelve un error si el token no existe
    }

    // Verifica el token
    const decodificacion = await verifyToken(token);  // Verifica el token utilizando la función verifyToken

    if (!decodificacion) {
      console.log(decodificacion);  // Imprime la decodificación del token
      return new Response(
        JSON.stringify({
          status: 400,
          message: "error en el JSONWEBTOKEN",
        })
      );  // Devuelve un error si la decodificación del token no existe
    }

    // Busca la credencial en la base de datos
    const credencialEncontrada = dataBase?.credenciales.find(
      (cred) => cred.uid == decodificacion.uid
    );  // Busca la credencial correspondiente al token en la base de datos
    const indexEventoCorrespontiente = dataBase?.eventos.findIndex(
      (evento) => evento.uid == uidEvento
    );  // Encuentra el índice del evento correspondiente al uidEvento

    // Verifica si la credencial existe
    if (!credencialEncontrada) {
      return new Response(
        JSON.stringify({
          status: 405,
          message: "QR Invalido",
        })
      );  // Devuelve un error si la credencial no existe
    }

    // Verifica si el evento corresponde
    if (credencialEncontrada.evento !== uidEvento) {
      return new Response(
        JSON.stringify({
          status: 500,
          message: "QR no corresponde a este evento",
        })
      );  // Devuelve un error si la credencial no corresponde al evento
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
      );  // Devuelve un error si la credencial ya fue utilizada
    }

    // Actualiza el estado de la credencial
    credencialEncontrada.estado = false;  // Actualiza el estado de la credencial a falso

    dataBase?.eventos[indexEventoCorrespontiente].checkIn.push({
      uid: generarUID(),  // Genera un identificador único para el check-in
      nombreApellido: decodificacion.name,
      uidInvitado: decodificacion.uid,
      hora: new Date().toLocaleTimeString(),  // Obtiene la hora actual
      invitados: decodificacion.invitados,
    });  // Agrega el check-in al evento correspondiente

    const jsonData = JSON.stringify(dataBase);  // Convierte la base de datos a formato JSON
    // Escribe el array actualizado de vuelta al archivo
    await fs.writeFile(filePathData, jsonData);  // Escribe la base de datos actualizada en el archivo base.json

    return new Response(
      JSON.stringify({
        status: 200,
        message: "exitoso",
        decodificacion,
      })
    );  // Devuelve una respuesta exitosa con la decodificación del token
  } catch (error) {
    console.error(error);  // Maneja cualquier error
  }
};
