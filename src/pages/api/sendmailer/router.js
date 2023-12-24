import { getTemplate, sendMailer } from "../../../nodemailer/nodemailer";

export const POST=async({request})=>{

    try {
        const data = await request.formData();
        const email = data.get("mail");
        const uidEvento = data.get('uidEvento');
        const nombreApellido = data.get("nombreApellido");
        const image = data.get("image");

        // Leer la imagen como un Buffer
        const imageBuffer = await image.arrayBuffer();

        // Convertir el Buffer a una cadena base64
        const base64Image = Buffer.from(imageBuffer).toString('base64');

        const template = getTemplate(nombreApellido, base64Image);
        sendMailer(email, 'prueba', template, base64Image);
        return new Response(JSON.stringify({
            status: 200,
            message: email,
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: email,
        }));
    }
}