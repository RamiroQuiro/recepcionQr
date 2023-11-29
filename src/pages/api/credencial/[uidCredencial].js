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



export const DELETE = async ({ request }) => {
  try {
    const filePathData = path.join(process.cwd(), "public", "base", "base.json");
    const uidCredencial = request.url.split("/")[5];
    const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));
    const index = dataBase.credenciales.findIndex((credencial) => credencial.uid == uidCredencial);
  
    if (index !== -1) {
      dataBase.credenciales.splice(index, 1);
      const jsonData = JSON.stringify(dataBase);
      await fs.writeFile(filePathData, jsonData);
    
      return new Response(
        JSON.stringify({
          status: 200,
          message: "Credencial eliminada con éxito",
        })
      );
    } else {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Credencial no encontrada",
        })
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Error del servidor",
      })
    );
  }
}


export const PUT = async ({ request }) => {
  try {
    const body = await request.json();  // Espera a que se resuelva la promesa
    const { estado } = body;  // Ahora puedes desestructurar el cuerpo de la solicitud
    const filePathData = path.join(process.cwd(), "public", "base", "base.json");
    const uidCredencial = request.url.split("/")[5];
    const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));
    const credenciales=dataBase.credenciales
    
    const index = credenciales.findIndex((credencial) => credencial.uid == uidCredencial);
  
    if (index !== -1) {
      // Actualizar la credencial en la base de datos
      credenciales[index].estado=!estado
      const jsonData = JSON.stringify(dataBase);
      await fs.writeFile(filePathData, jsonData);

      return new Response(
        JSON.stringify({
          status: 200,
          message: "Credencial actualizada con éxito",
        })
      );
    } else {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Credencial no encontrada",
        })
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Error del servidor",
      })
    );
  }
}