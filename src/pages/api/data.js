import QRCode from "qrcode";
import path from "path";
import fs from "fs/promises";
import { generateToken } from "../../database/jsonwebtoken";

function generarUID() {
  return Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
}

const generateQR = async (name, dni, invitados, evento, mesa) => {
  try {
    // Crear un objeto con los datos
    const data = {
      name: name,
      dni: dni,
      invitados: invitados,
      evento: evento,
      mesa: mesa,
    };

    // Convertir el objeto a una cadena de texto en formato JSON
    // const dataString = JSON.stringify(data);
    // generar el TOKEN
    const dataString = generateToken(data);

    // Generar el código QR
    const qr = await QRCode.toDataURL(dataString);
    return qr;
  } catch (err) {
    console.error(err);
  }
};

// Define la ruta del archivo
const filePathData = path.join(process.cwd(), "public", "base", "base.json");
// Lee el archivo y parsea el contenido a un array
const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));

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

    
    const qrCodeGenerado = await generateQR(
      name,
      dni,
      cantInvitados,
      evento,
      dni
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
      QRCode:qrCodeGenerado
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
  const credenciales = dataBase.credenciales;

  return new Response(
    JSON.stringify({
      status: 200,
      credenciales,
    })
  );
};
