import path from "path";
import fs from "fs/promises";

export const GET = async ({ request }) => {
  const uidCredencial = request.url.split("/")[5];

// Define la ruta del archivo
const filePathData = path.join(process.cwd(), "public", "base", "base.json");
// Lee el archivo y parsea el contenido a un array
const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));


const buscarUidCredencial=async (uidCredencial)=>{
if (!dataBase) {
    return
}
    return await dataBase?.credenciales?.find((credencial)=>credencial.uid==uidCredencial)

}
const findCredencial=await buscarUidCredencial(uidCredencial)
if (!findCredencial) {
    return new Response(JSON.stringify({
        status:400,
        message:"credencial no encontrada"
    }))
}

  return new Response(
    JSON.stringify({
      status: 200,
      credencial: findCredencial,
    })
  );
};
