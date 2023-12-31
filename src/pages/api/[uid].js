import path from "path"
import fs from 'fs/promises'


const DES = import.meta.env.URL_DESARROLLO;
const PRODUC = import.meta.env.URL_PRODUCCION;
const isDev = import.meta.env.DEV;

// Define la ruta base dependiendo del entorno
const basePath = !isDev  ? PRODUC : DES;

export const GET=async({request})=>{


    const uid = request.url.split("/")[4];
    const filePathData = path.join(process.cwd(), basePath, 'base', 'base.json');
   
    try {
        const data = JSON.parse(await fs.readFile(filePathData, 'utf8'));
        const acreditaciones=data.credenciales.filter((credencial)=>credencial.evento===uid)
        const objectEvento=data.eventos.find(event=>event.uid==uid)
        
        return new Response(
          JSON.stringify({
            message: "¡Éxito!",
            files: objectEvento,
            acreditaciones
          }),
          { status: 200 }
        );
      } catch (err) {
        console.log(err)
      }
    return new Response(JSON.stringify({
        msg:"hola"
    }))
}