import path from "path";
import fs from "fs/promises";
import QRCode from "qrcode";
import { generateToken } from "../../../database/jsonwebtoken";

const DES = import.meta.env.URL_DESARROLLO;
const PRODUC = import.meta.env.URL_PRODUCCION;
const isDev = import.meta.env.DEV;

// Define la ruta base dependiendo del entorno
const basePath = !isDev  ? PRODUC : DES;

const generateQR = async (credencial) => {
  try {
    // Crear un objeto con los datos

    // Convertir el objeto a una cadena de texto en formato JSON
    // const dataString = JSON.stringify(data);
    // generar el TOKEN
    const dataString = await generateToken(credencial);

    // Generar el código QR
    const qr = await QRCode.toDataURL(dataString);
    return qr;
  } catch (err) {
    console.error(err);
  }
};

export const GET = async ({ request }) => {
  const uidCredencial = request.url.split("/")[5];

  // Define la ruta del archivo
  const filePathData = path.join(process.cwd(), basePath, "base", "base.json");
  // Lee el archivo y parsea el contenido a un array
  const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));

  const buscarUidCredencial = async (uidCredencial) => {
    if (!dataBase) {
      return;
    }
    return await dataBase?.credenciales?.find(
      (credencial) => credencial.uid == uidCredencial
    );
  };
  const findCredencial = await buscarUidCredencial(uidCredencial);
  if (!findCredencial) {
    return new Response(
      JSON.stringify({
        status: 400,
        message: "credencial no encontrada",
      })
    );
  }

  return new Response(
    JSON.stringify({
      status: 200,
      credencial: findCredencial,
    })
  );
};

export const DELETE = async ({ request }) => {

  try {
    const filePathData = path.join(
      process.cwd(),
      basePath,
      "base",
      "base.json"
    );
    const uidCredencial = request.url.split("/")[5];
    const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));
    const index = dataBase.credenciales.findIndex(
      (credencial) => credencial.uid == uidCredencial
    );

    if (index !== -1) {
      dataBase.credenciales.splice(index, 1);
      const jsonData = JSON.stringify(dataBase);
      await fs.writeFile(filePathData, jsonData);

      return new Response(
        JSON.stringify({
          status: 200,
          message: "Credencial eliminada con éxito",
        })
      );
    } else {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Credencial no encontrada",
        })
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Error del servidor",
      })
    );
  }
};

export const PUT = async ({ request }) => {

  try {
    const body = await request.json(); // Espera a que se resuelva la promesa
    const { estado } = body; // Ahora puedes desestructurar el cuerpo de la solicitud
    console.log('este es el put ->',estado)
    const filePathData = path.join(process.cwd(),basePath,"base","base.json");
    const uidCredencial = request.url.split("/")[5];
    const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));
    const credenciales = dataBase.credenciales;

    const index = credenciales.findIndex(
      (credencial) => credencial.uid == uidCredencial
    );

    if (index !== -1) {
      // Actualizar la credencial en la base de datos

      // modificar solamente estado si en el body del endpoint exite el estado como variable
      if (typeof estado === "boolean") {
        credenciales[index].estado = !estado;
        const jsonData = JSON.stringify(dataBase);
        await fs.writeFile(filePathData, jsonData);
        return new Response(
          JSON.stringify({
            status: 200,
            message: "Credencial actualizada con éxito",
          })
        );
      }

      try {
        credenciales[index] = { ...credenciales[index], ...body };
        // Hacer una copia del objeto credenciales[index]
        const credencialWithoutQR = { ...credenciales[index] };
        // Eliminar el campo QRCode de la copia del objeto
        delete credencialWithoutQR.QRCode;
        // Luego puedes pasar credencialWithoutQR a la función generateQR
        const newQR = await generateQR(credencialWithoutQR);
        credenciales[index].QRCode = newQR;
        const jsonData = JSON.stringify(dataBase);
        await fs.writeFile(filePathData, jsonData);
        return new Response(
          JSON.stringify({
            status: 200,
            message: "Credencial actualizada con éxito",
            QRCode: newQR,
          })
        );
      } catch (error) {
        console.error(error);
        return new Response(
          JSON.stringify({
            status: 400,
            message: "Credencial no encontrada",
          })
        );
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Error del servidor",
      })
    );
  }
};

  export {generateQR}