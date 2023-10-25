export async function POST({request}){
   const body= await request.json()
return new Response (JSON.stringify({
  message:"staud ok"
}))
}