import path from "path";
import fs from "fs/promises";

export async function POST({ request }) {
  const { idVideo, uidEvento } = await request.json();
  const directoryPath = path.join(process.cwd(), "public", "upload");
  const filePathData = path.join(process.cwd(), "public", "base", "base.json");

  const files = await fs.readdir(directoryPath);
  const data = JSON.parse(await fs.readFile(filePathData, "utf8"));

  try {
    const indexEvento = data.data.findIndex((evento) => evento.uid === uidEvento);

    if (indexEvento !== -1) {
      if (!idVideo) {
        data.data.splice(indexEvento, 1);
        await fs.writeFile(filePathData, JSON.stringify(data));

        const directorios = await fs.readdir(directoryPath);
        const carpetaEvento = directorios.find((directorio) => directorio === uidEvento);

        if (carpetaEvento) {
          await fs.rm(path.join(directoryPath, carpetaEvento), { recursive: true });
        } else {
          console.log("Evento no encontrado");
        }

        return new Response(
          JSON.stringify({
            message: "Evento eliminado",
            status: 200,
          })
        );
      } else {
        const indexVideo = data.data[indexEvento].videos.findIndex((video) => video.id === idVideo);

        if (indexVideo !== -1) {
          data.data[indexEvento].videos.splice(indexVideo, 1);
          await fs.writeFile(filePathData, JSON.stringify(data));

          const videoPath = data.data[indexEvento].videos[indexVideo].path;
          const videoFileName = videoPath.split("/").pop();
          await fs.unlink(path.join(directoryPath, videoFileName));

          return new Response(
            JSON.stringify({
              message: "Video eliminado",
              status: 200,
            })
          );
        } else {
          return new Response(
            JSON.stringify({
              message: "Video no encontrado",
              status: 404,
            })
          );
        }
      }
    } else {
      return new Response(
        JSON.stringify({
          message: "Evento no encontrado",
          status: 404,
        })
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error al eliminar el video o el evento",
        status: 500,
      })
    );
  }
}