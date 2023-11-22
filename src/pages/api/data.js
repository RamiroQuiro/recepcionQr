import QRCode from 'qrcode'
import { generateToken } from '../../database/jsonwebtoken';

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
        mesa: mesa
      };
  
      // Convertir el objeto a una cadena de texto en formato JSON
      // const dataString = JSON.stringify(data);
  // generar el TOKEN
const dataString=generateToken(data)

      // Generar el código QR
      const qr = await QRCode.toDataURL(dataString);
      return qr;
    } catch (err) {
      console.error(err);
    }
  };

export const POST = async ({ request }) => {
    const data = await request.formData();
    const name = data.get("nombreApellido");
    const dni = data.get("dni");
    const evento = data.get("evento");
    const video = data.get("video");
    const cantInvitados = data.get("cantInvitados");
  
    const uid = generarUID();
  console.log(name, dni, evento, video, cantInvitados)
    // Valida los datos - probablemente querrás hacer más que esto
    if (!name || !video || !evento) {
      return new Response(
        JSON.stringify({
          message: "Faltan campos requeridos",
        }),
        { status: 400 }
      );
    }
    const qrCodeGenerado = await generateQR(name,dni,cantInvitados,evento,dni)
    

    return new Response(
        JSON.stringify({
          message: "¡Éxito!",
          name: name,
          qr: qrCodeGenerado
        }),
        { status: 200 }
      );
}