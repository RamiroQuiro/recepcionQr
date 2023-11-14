import fs from 'fs/promises';
import path from "path";

export async function GET() {

  const directoryPath = path.join(process.cwd(), 'client/upload');
  const filePathData = path.join(process.cwd(), 'client', 'base', 'base.json');
  try {
    const files = await fs.readdir(directoryPath);
    const data = JSON.parse(await fs.readFile(filePathData, 'utf8'));
    return new Response(
      JSON.stringify({
        message: "¡Éxito!",
        files: data.data,
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

