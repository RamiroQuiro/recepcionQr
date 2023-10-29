import fs from 'fs';
import path from 'path';

export const POST = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const video = data.get("video");


  // Valida los datos - probablemente querrás hacer más que esto
  if (!name || !video ) {
    return new Response(
      JSON.stringify({
        message: "Faltan campos requeridos",
      }),
      { status: 400 }
    );
  }

  //   leyendo video

  const byte = await video.arrayBuffer()
  const buffer = Buffer.from(byte);
  const filePath = path.join(process.cwd(), 'public', 'upload', `${name}.mp4`);
  fs.writeFileSync(filePath, buffer);

  // Haz algo con los datos, luego devuelve una respuesta de éxito
  return new Response(
    JSON.stringify({
      message: "¡Éxito!",
      name: name
    }),
    { status: 200 }
  );
};