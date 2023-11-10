import path from "path";
import fs from "fs/promises";
export async function POST({ request }) {
  const { idVideo, uidEvento } = await request.json();
  const directoryPath = path.join(process.cwd(), "public", "upload");
  const filePathData = path.join(process.cwd(), "public", "base", "base.json");

  const files = await fs.readdir(directoryPath);
  const data = JSON.parse(await fs.readFile(filePathData, "utf8"));
  /*
este codigo para eliminar el evento
*/

  console.log(idVideo);
  try {
    // Find the index of the video with the given id
    const indexEvento = data.data.findIndex(
      (evento) => evento.uid === uidEvento
    );

    if (indexEvento !== -1) {
        // accion paraa eliminar evento
      if (!idVideo) {
        // Remove the video from the data array
        data.data.splice(indexEvento, 1);

        // Save the updated data to the JSON file
        await fs.writeFile(filePathData, JSON.stringify(data));

        // Delete the video file from the upload directory
        const carpetaEvento = files.find((file) => file === uidEvento);
        
        if (carpetaEvento) {
          await fs.rm(path.join(directoryPath, carpetaEvento),{recursive:true});
        } else {
          console.log("Evento no encontrado");
        }

        return new Response(
          JSON.stringify({
            message: "Evento eliminado",
            status: 200,
          })
        );
      } 
    //   codigo para elimnar el video
      else {
        // Find the index of the video with the given id
        const indexVideo = data.data[indexEvento].videos.findIndex(
          (video) => video.id === idVideo
        );

        if (indexVideo !== -1) {
          // Remove the video from the videos array
          data.data[indexEvento].videos.splice(indexVideo, 1);

          // Save the updated data to the JSON file
          await fs.writeFile(filePathData, JSON.stringify(data));

          // Delete the video file from the upload directory
          const videoPath = data.data[indexEvento].videos[indexVideo].path;
          const videoFileName = videoPath.split("/").pop();
          await fs.unlink(path.join(directoryPath, carpetaEvento, videoFileName));

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
          message: "Video no encontrado",
          status: 404,
        })
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error al eliminar el video",
        status: 500,
      })
    );
  }
}

