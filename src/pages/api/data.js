import QRCode from "qrcode";
import path from "path";
import fs from "fs/promises";
import { generateToken } from "../../database/jsonwebtoken";


const DES = import.meta.env.URL_DESARROLLO;
const PRODUC = import.meta.env.URL_PRODUCCION;
const isDev = import.meta.env.DEV;

// Define la ruta base dependiendo del entorno
const basePath = !isDev  ? PRODUC : DES;

function generarUID() {
  return Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
}

const options = {
  errorCorrectionLevel: 'H',
  type: 'image/jpeg',
  rendererOpts: {
    quality: 0.8
  },
  margin: 2,
 
};
const generateQR = async (
  name,
  dni,
  invitados,
  evento,
  video,
  email,
  celular,
  uid
) => {
  try {
    // Crear un objeto con los datos
    const data = {
      name,
      dni,
      invitados,
      evento,
      video,
      email,
      uid,
      celular,
      estado: true,
    };

    // Convertir el objeto a una cadena de texto en formato JSON
    // const dataString = JSON.stringify(data);
    // generar el TOKEN
    const dataString = generateToken(data);

    // Generar el código QR
    const qr = await QRCode.toDataURL(dataString,options);
    return qr;
  } catch (err) {
    console.error(err);
  }
};

export const POST = async ({ request }) => {

  const data = await request.formData();
  const name = data.get("nombreApellido");
  const dni = data.get("dni");
  const celular = data.get("celular");
  const email = data.get("email");
  const evento = data.get("evento");
  const video = data.get("video");
  const cantInvitados = data.get("cantInvitados");
  const uid = generarUID();

  // Valida los datos - probablemente querrás hacer más que esto
  if (!name || !video || !evento) {
    return new Response(
      JSON.stringify({
        message: "Faltan campos requeridos",
      }),
      { status: 400 }
    );
  } else {
    // Define la ruta del archivo
    const filePathData = path.join(
      process.cwd(),
      basePath,
      "base",
      "base.json"
    );
    // Lee el archivo y parsea el contenido a un array
    const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));
    const qrCodeGenerado = await generateQR(
      name,
      dni,
      cantInvitados,
      evento,
      video,
      email,
      celular,
      uid
    );

    const newData = {
      uid: uid,
      nombreApellido: name,
      celular,
      email,
      dni,
      invitados: cantInvitados,
      evento,
      video,
      estado: true,
      QRCode: qrCodeGenerado,
    };

    dataBase?.credenciales?.push(newData);

    const jsonData = JSON.stringify(dataBase);
    // Escribe el array actualizado de vuelta al archivo
    await fs.writeFile(filePathData, jsonData);

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

export const GET = async () => {
  
  // Define la ruta del archivo
  const filePathData = path.join(process.cwd(), basePath, "base", "base.json");
  // Lee el archivo y parsea el contenido a un array
  const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));
  const credenciales = dataBase.credenciales;
  const eventosDatabase = dataBase.eventos;

  // Para cada credencial, verificamos si el evento asociado existe en la base de datos de eventos
  credenciales.forEach((credencial) => {
    const eventoExiste = eventosDatabase.some(
      (evento) => evento.uid === credencial.evento
    );
    if (!eventoExiste) {
      credencial.evento = false;
    }
  });

  dataBase.credenciales = credenciales;
  const jsonData = JSON.stringify(dataBase);
  await fs.writeFile(filePathData, jsonData);

  return new Response(
    JSON.stringify({
      status: 200,
      credenciales,
    })
  );
};
