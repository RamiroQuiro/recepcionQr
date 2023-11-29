import path from 'path'
import fs from 'fs/promises'

export const obtenerInformacionDeLaBaseDeDatos = async (uidEvento) => {
    console.log('dento de la funcion de la base de datosd',uidEvento)
    const filePathData = path.join(process.cwd(), "public", "base", "base.json");

    // Leemos los archivos del directorio y el archivo de datos JSON.
    const data = JSON.parse(await fs.readFile(filePathData, "utf8"));
    const eventoEncontrado = data.eventos.find((event) => Number(event.uid) === Number(uidEvento));

    return eventoEncontrado.checkIn;
}
