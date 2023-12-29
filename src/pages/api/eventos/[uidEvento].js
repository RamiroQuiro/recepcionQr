import path from "path";
import fs from "fs/promises";
import { generarUID } from "../eventos";
import { generateQR } from "../credencial/[uidCredencial]";
import BotonCargaCredencial from "../../../components/BotonCargaCredencial.astro";

const DES = import.meta.env.URL_DESARROLLO;
const PRODUC = import.meta.env.URL_PRODUCCION;
const isDev = import.meta.env.DEV;

// Define la ruta base dependiendo del entorno
const basePath = !isDev ? PRODUC : DES;

export const GET = async ({ request }) => {
  // Define la ruta del archivo
  const filePathData = path.join(process.cwd(), basePath, "base", "base.json");
  const url = await request.url.split("/")[5];
  // Lee el archivo y parsea el contenido a un array
  const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));
  let arrayEventos = dataBase.eventos
    ?.filter((evento) => evento.uid === url)
    ?.map((element) => {
      return {
        name: element.nombre,
        uid: element.uid,
        portada: element.path,
        nVideos: element.videos.length,
        videos: element.videos,
        acreditaciones: dataBase.credenciales.filter(
          (creden) => creden.evento == element.uid
        ),
        checkIn: element.checkIn,
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
  // Leer la base de datos existente
  const filePathData = path.join(process.cwd(), basePath, "base", "base.json");
  const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));
  const credenciales = dataBase.credenciales;
  try {
    // Parsear el cuerpo de la solicitud
    const body = await request.json();
    const data = await body.data;
    const uidEvento = await body.uidEvento
    const url = await request.url.split("/")[5];

    let newData = data.reduce((acc, { nombreApellido, dni, email, celular, evento }) => {
      let verificacion = credenciales.some(
        (cred) => Number(cred.dni) === Number(dni) && Number(cred.evento) === Number(uidEvento)
      );
      if (!verificacion) {
        const uid = generarUID();
        acc.push({
          uid,
          nombreApellido,
          dni,
          email,
          celular,
          invitados: 1,
          video: undefined,
          estado: true,
          evento: url,
        });
      }
      return acc;
    }, []);
    console.log(newData)
    // Generar códigos QR para cada credencial
    const promise = newData.map(async (credencial) => {
      return new Promise(async (resolve, reject) => {
        try {
          const newQR = await generateQR(credencial);
          credencial.QRCode = newQR;
          resolve(credencial);
        } catch (error) {
          reject(error);
        }
      });
    });

    // Esperar a que todas las promesas se resuelvan
    let newCredenciales = await Promise.all(promise);

    // Agregar las nuevas credenciales a la base de datos
    dataBase.credenciales.push(...newCredenciales);

    // Escribir la base de datos actualizada de nuevo al archivo
    const jsonData = JSON.stringify(dataBase);
    await fs.writeFile(filePathData, jsonData);

    // Devolver una respuesta exitosa
    return new Response(
      JSON.stringify({
        status: 200,
        acreditaciones: "ok",
      })
    );
  } catch (error) {
    // Manejar cualquier error que pueda ocurrir
    console.error(error);
    return new Response(
      JSON.stringify({
        status: 500,
        error: "Ha ocurrido un error en el servidor",
      })
    );
  }
};
