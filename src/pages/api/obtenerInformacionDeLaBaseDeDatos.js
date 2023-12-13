import path from 'path'
import fs from 'fs/promises'


const DES = import.meta.env.URL_DESARROLLO;
const PRODUC = import.meta.env.URL_PRODUCCION;
const isDev = import.meta.env.DEV;

// Define la ruta base dependiendo del entorno
const basePath = !isDev  ? PRODUC : DES;

export const obtenerInformacionDeLaBaseDeDatos = async (uidEvento) => {

    const filePathData = path.join(process.cwd(), basePath, "base", "base.json");

    // Leemos los archivos del directorio y el archivo de datos JSON.
    const data = JSON.parse(await fs.readFile(filePathData, "utf8"));
    const eventoEncontrado = data.eventos.find((event) => Number(event.uid) === Number(uidEvento));

    return eventoEncontrado.checkIn;
}
