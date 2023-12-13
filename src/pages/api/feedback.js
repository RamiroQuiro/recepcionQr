import fs from "fs/promises";
import path from "path";
import QRCode from "qrcode";

function generarUID() {
  return Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
}

const formatoQR = {
  color: { light: "#ffffff", dark: "#00001Eff" },
  errorCorrectionLevel: "H",
  type: "image/png",
  margin: "3",
  quality: 1,
  scale: 4,
};


const DES = import.meta.env.URL_DESARROLLO;
const PRODUC = import.meta.env.URL_PRODUCCION;
const isDev = import.meta.env.DEV;

// Define la ruta base dependiendo del entorno
const basePath = !isDev  ? PRODUC : DES;


export const POST = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const evento = data.get("eventoUID");
  const video = data.get("video");

  const id = generarUID();



  // Valida los datos
  if (!name || !video || !evento) {
    return new Response(
      JSON.stringify({
        message: "Faltan campos requeridos",
      }),
      { status: 400 }
    );
  }
  

  // Define la ruta del archivo
  const filePathData = path.join(process.cwd(), basePath, "base", "base.json");
  // Lee el archivo y parsea el contenido a un array
  const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));

  // Función para verificar si el nombre ya existe
  const nombreExiste = (nombre, eventoUID) => {
    // Busca en el array de videos
    const eventoFind = dataBase.eventos.find((event) => event.uid == eventoUID);
    return eventoFind.videos.some((video) => video.name === nombre);
  };

  // Antes de agregar los nuevos datos, verifica si el nombre ya existe
  if (nombreExiste(name, evento)) {
    return new Response(
      JSON.stringify({
        message: "El nombre ya existe",
        status: 205,
      }),
      { status: 400 }
    );
  } else {
    //   leyendo video

    const byte = await video.arrayBuffer();
    const buffer = Buffer.from(byte);

    // escirbiendo el video
    const filePath = path.join(
      process.cwd(),
      basePath,
      `upload/${evento}/${id}.mp4`
    );
    await fs.writeFile(filePath, buffer);

    // generando el codigo
    const generateQR = async (text) => {
      try {
        const qr = await QRCode.toDataURL(
          `http://localhost:4321/upload/${evento}/` + text + ".mp4",
          formatoQR
        );
        return qr;
      } catch (err) {
        console.error(err);
      }
    };
    // qr de video
    const qrCodeGenerado = await generateQR(id);
    // Tus nuevos datos a agregar
    const newData = {
      name: name,
      path: `http://localhost:4321/upload/${evento}/${id}.mp4`,
      id: id,
      code: qrCodeGenerado,
    };

    // Lee el archivo y parsea el contenido a un array

    // Agrega los nuevos datos al array
    const eventoFind = dataBase.eventos.find((event) => event.uid == evento);
    eventoFind.videos.push(newData);
    // Convierte el array actualizado a formato JSON
    const jsonData = JSON.stringify(dataBase);

    // Escribe el array actualizado de vuelta al archivo
    await fs.writeFile(filePathData, jsonData);

    // Haz algo con los datos, luego devuelve una respuesta de éxito
    return new Response(
      JSON.stringify({
        message: "¡Éxito!",
        name: name,
        qr: qrCodeGenerado,
      }),
      { status: 200 }
    );
  }
};
