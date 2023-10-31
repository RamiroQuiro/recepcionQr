import fs from 'fs/promises';
import path from 'path';
import QRCode from 'qrcode'

function generarUID() {
  return Math.floor(Math.random() * 10000).toString().padStart(4, '0');
}


const formatoQR = {
  color: { light: "#ffffff", dark: "#00001Eff" },
  errorCorrectionLevel: "H",
  type: "image/png",
  margin: "3",
  quality: 1,
  scale: 4,
}
export const POST = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const video = data.get("video");

const id=generarUID()
  

  // Valida los datos - probablemente querrás hacer más que esto
  if (!name || !video ) {
    return new Response(
      JSON.stringify({
        message: "Faltan campos requeridos",
      }),
      { status: 400 }
    );
  }

  //   leyendo video

  const byte = await video.arrayBuffer();
  const buffer = Buffer.from(byte);
  const filePath = path.join(process.cwd(), 'public', 'upload', `${id}.mp4`);
  await fs.writeFile(filePath, buffer);

  // generando el codigo
  const generateQR = async (text) => {
    try {
      const qr = await QRCode.toDataURL(
        "http://localhost:4321/upload/" + text + ".mp4",formatoQR
      );
      return qr;
    } catch (err) {
      console.error(err);
    }
  };
;
const qrCodeGenerado=await generateQR(id)
// Tus nuevos datos a agregar
const newData = { name: name, path: `http://localhost:4321/public/upload/${name}.mp4` ,id:id,code:qrCodeGenerado};

// Define la ruta del archivo
const filePathData = path.join(process.cwd(), 'public','base', 'base.json');

// Lee el archivo y parsea el contenido a un array
const dataBase = JSON.parse(await fs.readFile(filePathData, 'utf8'));


// Agrega los nuevos datos al array
dataBase.data.push(newData);

// Convierte el array actualizado a formato JSON
const jsonData = JSON.stringify(dataBase);

// Escribe el array actualizado de vuelta al archivo
await fs.writeFile(filePathData, jsonData);



  // Haz algo con los datos, luego devuelve una respuesta de éxito
  return new Response(
    JSON.stringify({
      message: "¡Éxito!",
      name: name,
      qr:qrCodeGenerado
    }),
    { status: 200 }
  );
};