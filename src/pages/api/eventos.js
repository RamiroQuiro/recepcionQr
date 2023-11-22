import fs from "fs/promises";
import path from "path";

function generarUID() {
  return Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
}
export const POST = async ({ request }) => {
  const data = await request.formData();
  const nombre = data.get("nombre");
  const foto = data.get("foto");
  const fileExtension=data.get("extencion")
  console.log(fileExtension)
  const uid = generarUID();
  // Valida los datos - probablemente querrás hacer más que esto
  if (!nombre || !foto) {
    return new Response(
      JSON.stringify({
        message: "Faltan campos requeridos",
      })
    );
  }

  // Leyendo foto
  const byte = await foto.arrayBuffer();
  const buffer = Buffer.from(byte);
  try {
    const dirPath = path.join(process.cwd(), "public", "upload", `${uid}`);
    await fs.mkdir(dirPath, { recursive: true });
    const nombreArcivo=`portada.${fileExtension}`
    const filePath=path.join(process.cwd(),"public","upload",uid,nombreArcivo)
    await fs.writeFile(filePath,buffer)
  } catch (error) {
    console.error("Error al crar evento", error);
  }

  // Tus nuevos datos a agregar
  const newData = {
    uid: uid,
    nombre: nombre,
    path: `/upload/${uid}/portada.${fileExtension}`,
    videos: [],
  };

  // Define la ruta del archivo
  const filePathData = path.join(process.cwd(), "public", "base", "base.json");

  // Lee el archivo y parsea el contenido a un array
  const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));

  // Agrega los nuevos datos al array
  dataBase.eventos.push(newData);

  // Convierte el array actualizado a formato JSON
  const jsonData = JSON.stringify(dataBase);

  // Escribe el array actualizado de vuelta al archivo
  await fs.writeFile(filePathData, jsonData);

  // Haz algo con los datos, luego devuelve una respuesta de éxito
  return new Response(
    JSON.stringify({
      message: "¡Éxito!",
      nombre: nombre,
    })
  );
};

export const GET = async ({ request }) => {
  // Define la ruta del archivo
  const filePathData = path.join(process.cwd(), "public", "base", "base.json");

  // Lee el archivo y parsea el contenido a un array
  const dataBase = JSON.parse(await fs.readFile(filePathData, "utf8"));

  let arrayEventos = dataBase.eventos?.map((element) => {
    return {
      name: element.nombre,
      uid: element.uid,
      portada:element.path,
      nVideos:element.videos.length,
      videos:element.videos
    };
  });
  // Agrega los nuevos datos al array
  return new Response(
    JSON.stringify({
      eventos: arrayEventos,
    })
  );
};
