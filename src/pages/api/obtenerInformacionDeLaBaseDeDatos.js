import path from 'path'
import fs from 'fs/promises'

export const obtenerInformacionDeLaBaseDeDatos = async (uidEvento) => {
    const filePathData = path.join(process.cwd(), "public", "base", "base.json");

    // Leemos los archivos del directorio y el archivo de datos JSON.
    const data = JSON.parse(await fs.readFile(filePathData, "utf8"));
    console.log(data.eventos);
    const eventoEncontrado = data.eventos.find((event) => event.uid === uidEvento);
  
    return eventoEncontrado;
}
