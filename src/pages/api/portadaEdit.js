import { promises as fs } from 'fs';
import path from 'path';

export async function POST({request}) {
    // Extraer los datos de la solicitud
    const data = await request.formData();
    const uid = data.get("uid");
    const file = data.get("file");
    const extension = data.get("extension");

    // Construir las rutas de los archivos
    const filePathData = path.join(process.cwd(), "public", "base", "base.json");
    const pathDirectory = path.join(process.cwd(), 'public', 'upload', uid);
    const pathPortada = path.join(pathDirectory, 'portada.' + extension);

    // Leer y parsear la base de datos
    const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));

    // Leer el directorio
    const leerDirectorio = await fs.readdir(pathDirectory);

    // Verificar si el archivo de portada existe
    if (leerDirectorio.includes('portada.' + extension)) {
        console.log('El archivo de portada ya existe');
    }

    // Convertir el archivo a un Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Reemplazar el archivo de portada con el archivo entrante
    await fs.writeFile(pathPortada, buffer);

    return new Response(JSON.stringify({
        data: "is ok"
    }));
}
