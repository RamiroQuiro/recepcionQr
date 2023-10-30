import fs from 'fs'
import path from "path";

export async function GET() {

const directoryPath=path.join(process.cwd(),'public/upload')
const filePathData = path.join(process.cwd(), 'public','base', 'base.json');
try {
    const files = fs.readdirSync(directoryPath);
    const data = JSON.parse(fs.readFileSync(filePathData, 'utf8'));
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
