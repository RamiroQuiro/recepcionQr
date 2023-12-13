import fs from 'fs/promises'
import path from 'path';
const DES = import.meta.env.URL_DESARROLLO;
const PRODUC = import.meta.env.URL_PRODUCCION;
const isDev = import.meta.env.DEV;

// Define la ruta base dependiendo del entorno
const basePath = !isDev  ? PRODUC : DES;

export async function POST({request}) {
    // Extraer los datos de la solicitud
    const data = await request.formData();
    const uid = data.get("uid");
    const file = data.get("file");
    const extension = data.get("extension");

    // Construir las rutas de los archivos
    const filePathData = path.join(process.cwd(), basePath, "base", "base.json");
    const pathDirectory = path.join(process.cwd(), basePath, 'upload', uid);
    const pathPortada = path.join(pathDirectory, 'portada.' + extension);

    try {
        // Convertir el archivo a un Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Reemplazar el archivo de portada con el archivo entrante
        await fs.writeFile(pathPortada, buffer);
        const data = JSON.parse(await fs.readFile(filePathData, "utf8"));
        const indexEvento = data.eventos.findIndex((evento) => evento.uid === uid);
        data.eventos[indexEvento].path=`/upload/${uid}/portada.${extension}`;
        await fs.writeFile(filePathData, JSON.stringify(data));

        return new Response(JSON.stringify({
            data: "is ok"
        }));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
            error: "Error al cambiar la imagen de portada"
        }));
    }
}
