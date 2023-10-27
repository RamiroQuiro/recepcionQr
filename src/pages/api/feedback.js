import formidable from "formidable";

// Esta función lee el archivo del request y lo guarda localmente si saveLocally es verdadero
const leerArchivo = (req, guardarLocalmente) => {
    if(guardarLocalmente){
        console.log('Guardando archivo localmente')
    }
    // Crear una nueva instancia de formidable
    const form = formidable();
    // Retornar una promesa que se resuelve cuando el archivo es leído
    return new Promise((resolver, rechazar) => {
        form.parse(req, (err, campos, archivos) => {
            if(err) rechazar(err);
            resolver({campos, archivos});
        });
    });
}

export const POST = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  console.log(email)
  
  
  // Valida los datos - probablemente querrás hacer más que esto
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Faltan campos requeridos",
      }),
      { status: 400 }
    );
  }
  // Haz algo con los datos, luego devuelve una respuesta de éxito
  return new Response(
    JSON.stringify({
      message: "¡Éxito!"
    }),
    { status: 200 }
  );
};