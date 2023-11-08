import path, { join } from "path"
import fs from 'fs/promises'

export const GET=async({request})=>{
    const uid = request.url.split("/")[4];
    const filePathData = path.join(process.cwd(), 'public', 'base', 'base.json');
    try {
        const data = JSON.parse(await fs.readFile(filePathData, 'utf8'));
        const arrayVideos=data.data.find(event=>event.uid==uid).videos
        
        return new Response(
          JSON.stringify({
            message: "¡Éxito!",
            files: arrayVideos,
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