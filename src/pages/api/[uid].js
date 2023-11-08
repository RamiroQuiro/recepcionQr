import path, { join } from "path"
import fs from 'fs/promises'

export const GET=async({request})=>{
    const uid = request.url.split("/")[4];
    const directoryPath = path.join(process.cwd(), 'public', `upload/${uid}`);

const files=await fs.readdir(directoryPath)
console.log(files)
    return new Response(JSON.stringify({
        msg:"hola"
    }))
}