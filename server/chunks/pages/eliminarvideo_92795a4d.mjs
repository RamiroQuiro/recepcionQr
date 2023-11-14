import path from 'path';
import fs from 'fs/promises';

// Este código es una función de API que maneja una solicitud POST para eliminar un video o un evento.
// Comenzamos importando los módulos necesarios.

async function POST({ request }) {
  // Extraemos los datos necesarios de la solicitud JSON.
  const { idVideo, uidEvento } = await request.json();

  // Definimos las rutas de los directorios y archivos relevantes.
  const directoryPath = path.join(process.cwd(), "public", "upload");
  const filePathData = path.join(process.cwd(), "public", "base", "base.json");

  // Leemos los archivos del directorio y el archivo de datos JSON.
  await fs.readdir(directoryPath);
  const data = JSON.parse(await fs.readFile(filePathData, "utf8"));

  try {
    // Buscamos el índice del evento en los datos.
    const indexEvento = data.data.findIndex((evento) => evento.uid === uidEvento);

    if (indexEvento !== -1) {
      // Si no se proporciona un idVideo, eliminamos todo el evento.
      if (!idVideo) {
        // Eliminamos el evento de los datos y guardamos los cambios.
        data.data.splice(indexEvento, 1);
        await fs.writeFile(filePathData, JSON.stringify(data));

        // Buscamos la carpeta del evento en el directorio y la eliminamos si existe.
        const directorios = await fs.readdir(directoryPath);
        const carpetaEvento = directorios.find((directorio) => directorio === uidEvento);

        if (carpetaEvento) {
          await fs.rm(path.join(directoryPath, carpetaEvento), { recursive: true });
        } else {
          console.log("Evento no encontrado");
        }

        // Devolvemos una respuesta con un mensaje de éxito.
        return new Response(
          JSON.stringify({
            message: "Evento eliminado",
            status: 200,
          })
        );
      } else {
        // Si se proporciona un idVideo, eliminamos solo ese video del evento.
        const indexVideo = data.data[indexEvento].videos.findIndex((video) => video.id === idVideo);

        if (indexVideo !== -1) {
          // Eliminamos el video de los datos y guardamos los cambios.
          data.data[indexEvento].videos.splice(indexVideo, 1);
          await fs.writeFile(filePathData, JSON.stringify(data));

          // Obtenemos la ruta y el nombre de archivo del video.
          const videoPath = data.data[indexEvento].videos[indexVideo].path;
          const videoFileName = videoPath.split("/").pop();

          // Eliminamos el archivo de video del directorio.
          await fs.unlink(path.join(directoryPath, videoFileName));

          // Devolvemos una respuesta con un mensaje de éxito.
          return new Response(
            JSON.stringify({
              message: "Video eliminado",
              status: 200,
            })
          );
        } else {
          // Si el video no se encuentra en los datos, devolvemos una respuesta de error.
          return new Response(
            JSON.stringify({
              message: "Video no encontrado",
              status: 404,
            })
          );
        }
      }
    } else {
      // Si el evento no se encuentra en los datos, devolvemos una respuesta de error.
      return new Response(
        JSON.stringify({
          message: "Evento no encontrado",
          status: 404,
        })
      );
    }
  } catch (error) {
    // Si ocurre un error durante el proceso, devolvemos una respuesta de error.
    return new Response(
      JSON.stringify({
        message: "Error al eliminar el video o el evento",
        status: 500,
      })
    );
  }
}

export { POST };
