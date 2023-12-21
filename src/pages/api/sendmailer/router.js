import fs from 'fs/promises'
import { getTemplate, sendMailer } from "../../../nodemailer/nodemailer";

export const POST=async({request})=>{

    const data = await request.formData();
    const email=data.get("mail");
    const uidEvento=data.get('uidEvento')
    const nombreApellido=data.get("nombreApellido");
    const image = data.get("image");
    // Leer la imagen como un Buffer
    const imageBuffer = await fs.readFile(image.path);

    // Convertir el Buffer a una cadena base64
    const base64Image = imageBuffer.toString('base64');

    console.log('base64Image ->', base64Image);

    const template=getTemplate(nombreApellido,)
// sendMailer(email,'prueba',getTemplate(nombreApellido,canvas))
return new Response(JSON.stringify({
    status:200,
    message:email,
    uidEvento
}))
}