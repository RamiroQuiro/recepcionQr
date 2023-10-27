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

// Esta función maneja el método POST del API
export async function POST({ request }) {
    // Crear una nueva instancia de formidable
    const form = formidable();
    // Leer el archivo del request
    const resultado = await leerArchivo(request, true);
    console.log(resultado);
}

