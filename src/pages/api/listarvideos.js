import fs from 'fs'
import path from "path";

export async function GET() {

const directoryPath=path.join(process.cwd(),'public/upload')
try {
    const files = fs.readdirSync(directoryPath);
    console.log(files);
    return new Response(
        JSON.stringify({
          message: "¡Éxito!",
          files: files
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
