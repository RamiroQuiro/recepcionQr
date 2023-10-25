export async function POS({request}){
    if (request.headers.get("Content-Type") === "application/json") {
        const body = await request.json();
    console.log(body)  
    return new Response(JSON.stringify({
          message: "Tu nombre fue: " 
        }), {
          status: 200
        })
      }
      return new Response(null, { status: 400 });

}