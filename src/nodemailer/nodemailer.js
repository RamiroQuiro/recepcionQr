import nodemailer from "nodemailer";


const{EMAIL,EMAIL_PASS}=import.meta.env
export const transporter=nodemailer.createTransport({
  // service:'hotmail',
  // auth:{
  //   user:EMAIL,
  //   pass:EMAIL_PASS
  // },

  service:'gmail',
  host:'smtp.gmail.com',
  port:'587',
  secure:false,
  auth:{
    user:EMAIL,
    pass:EMAIL_PASS
  }


        // host: "sandbox.smtp.mailtrap.io",
        // port: 2525,
        // auth: {
        //   user: "3b7574b272492a",
        //   pass: "4d61131faa4224"
        // }
});

export const mailOptions = {
    from: EMAIL
};



export const sendMailer=async(email, subject,html,base64Image)=>{
      try {
        await transporter.sendMail({
          from:EMAIL,
          to:email,
          subject:subject,
          text:"RecepcionQR Rama-Code",
          html, // Agrega la imagen a tu HTML
          attachments: [{
              filename: 'image.png',
              content: base64Image,
              encoding: 'base64',
              cid: 'unique@nodemailer.com' //same cid value as in the html img src
          }]
        })
      } catch (error) {
        console.log(error)
      }
}

export const getTemplate=(name,dataURL)=>{

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
   <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
   
   </head>
   <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <div class="es-wrapper-color" style="background-color:#FAFAFA"><!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#fafafa"></v:fill>
        </v:background>
      <![endif]-->
     <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
       <tr>
        <td valign="top" style="padding:0;Margin:0">
        
         <table cellpadding="0" cellspacing="0" class="es-content es-visible-simple-html-only" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
           <tr>
            <td class="es-stripe-html" align="center" style="padding:0;Margin:0">
             <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
               <tr>
                <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px">
                 <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                   <tr>
                    <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                     <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;font-size:0px"><img src="https://qkbect.stripocdn.email/content/guids/CABINET_67e080d830d87c17802bd9b4fe1c0912/images/55191618237638326.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="100"></td>
                       </tr>
                       <tr>
                        <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:46px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:26px;font-style:normal;font-weight:bold;color:#333333">Hola ${name}!!!&nbsp;</h1></td>
                       </tr>
                       <tr>
                        <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><p>RecepcionQR - RamaCode</p>
                        <img src="cid:unique@nodemailer.com"/>
                       </tr>
                       
                       <tr>
                        <td align="center" class="es-m-p0r es-m-p0l" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#e7812f;font-size:14px"><strong>RamiroCode </strong>| WebDeveloper.</p></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table></td>
           </tr>
         </table>
       
        </td>
       </tr>
     </table>
    </div>
   </body>
  </html>`
}

