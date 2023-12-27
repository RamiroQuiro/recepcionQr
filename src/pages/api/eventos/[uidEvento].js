import path from "path";
import fs from 'fs/promises'


const DES = import.meta.env.URL_DESARROLLO;
const PRODUC = import.meta.env.URL_PRODUCCION;
const isDev = import.meta.env.DEV;

// Define la ruta base dependiendo del entorno
const basePath = !isDev  ? PRODUC : DES;

export const GET = async ({ request }) => {
    // Define la ruta del archivo
    const filePathData = path.join(process.cwd(), basePath, "base", "base.json");
  const url=await request.url.split('/')[5]
  // Lee el archivo y parsea el contenido a un array
  const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));
  let arrayEventos = dataBase.eventos?.filter((evento)=>evento.uid===url)?.map((element) => {
      return {
        name: element.nombre,
        uid: element.uid,
        portada: element.path,
        nVideos: element.videos.length,
        videos: element.videos,
        acreditaciones: dataBase.credenciales.filter(
          (creden) => creden.evento == element.uid
        ),
        checkIn:element.checkIn
      };
    });
    // Agrega los nuevos datos al array
    return new Response(
      JSON.stringify({
        acreditaciones: arrayEventos,
      })
    );
  };

  export const PUT = async ({ request }) => {
    const data = await request
    const url=await request.url.split('/')[5]
    console.log(data)
    const filePathData = path.join(process.cwd(), basePath, "base", "base.json");
    const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));



    return new Response(
      JSON.stringify({
        acreditaciones: 'ok',
      })
    );
  };
