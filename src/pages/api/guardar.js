

export async function POST({request}) {
    if (request.headers.get("Content-Type") === "application/json") {
        const body = await request.json();
        const nombre = body.nombre;
        console.log(nombre)
        return new Response(JSON.stringify({
          message: "Tu nombre fue: " + nombre
        }), {
          status: 200
        })
      }
      return new Response(null, { status: 400 });
}