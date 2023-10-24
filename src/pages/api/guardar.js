import Video from "../../models/Videos";

export async function POST({ request }) {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const nombre = body.titleVideo;
    const videoModel = Video(body);
    const guardandoVideo=await videoModel.save()
    console.log(guardandoVideo)

    if(!guardandoVideo){
return new Response(
  JSON.stringify({
    status:500,
    message:"no se pudo guardar tu video"
  })
)
    }
    return new Response(
      JSON.stringify({
        message: "Tu nombre fue: " + nombre,
      }),
      {
        status: 200,
      }
    );
  }
  return new Response(null, { status: 400 });
}
