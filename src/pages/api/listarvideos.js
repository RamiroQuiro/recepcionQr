import fs from 'fs/promises';
import path from "path";


const DES = import.meta.env.URL_DESARROLLO;
const PRODUC = import.meta.env.URL_PRODUCCION;
const isDev = import.meta.env.DEV;

// Define la ruta base dependiendo del entorno
const basePath = !isDev  ? PRODUC : DES;

export async function GET() {

 
  const directoryPath = path.join(process.cwd(), `${basePath}/upload`);
  const filePathData = path.join(process.cwd(), basePath, 'base', 'base.json');
  try {
    const files = await fs.readdir(directoryPath);
    const data = JSON.parse(await fs.readFile(filePathData, 'utf8'));
    return new Response(
      JSON.stringify({
        message: "¡Éxito!",
        files: data.eventos,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        message: 'error al leer el directorio',
      }),
      { status: 200 }
    );
  }
}

