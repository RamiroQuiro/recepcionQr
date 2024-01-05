import path from "path";
import fs from "fs/promises";

const DES = import.meta.env.URL_DESARROLLO;
const PRODUC = import.meta.env.URL_PRODUCCION;
const isDev = import.meta.env.DEV;

// Define la ruta base dependiendo del entorno
const basePath = !isDev ? PRODUC : DES;

export const GET = async ({ request }) => {
  // Define la ruta del archivo
  const filePathData = path.join(process.cwd(), basePath, "base", "base.json");
  const url = await request.url.split("/")[6];
  // Lee el archivo y parsea el contenido a un array
  const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));

let credenciales=dataBase.credenciales?.filter((credencial)=>credencial.evento==url)

  let arrayEventos =credenciales
    ?.map((element) => {
      return {
        nombreApellido: element.nombreApellido,
        uid: element.uid,
        email:element.email,
        QRCode:element.QRCode

      }
    });
  // Agrega los nuevos datos al array
  return new Response(
    JSON.stringify({
      acreditaciones: arrayEventos,
    })
  );
};
