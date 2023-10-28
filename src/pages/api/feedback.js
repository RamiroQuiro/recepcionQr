import fs from 'fs';
import path, { dirname, relative } from 'path';

export const POST = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const image = data.get("image");
  const message = data.get("message");
  console.log(image)


  // Valida los datos - probablemente querrás hacer más que esto
  if (!name || !image || !message) {
    return new Response(
      JSON.stringify({
        message: "Faltan campos requeridos",
      }),
      { status: 400 }
    );
  }

  //   leyendo image

  const byte = await image.arrayBuffer()
  const buffer = Buffer.from(byte);
  const filePath = path.join(process.cwd(), 'public', 'upload', `${name}.mp4`);
  fs.writeFileSync(filePath, buffer);
console.log(relative(filePath))
  // Haz algo con los datos, luego devuelve una respuesta de éxito
  return new Response(
    JSON.stringify({
      message: "¡Éxito!",
      name: name
    }),
    { status: 200 }
  );
};