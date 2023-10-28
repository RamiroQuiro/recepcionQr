import { FormEvent, useState } from "react";
import QRCode from 'qrcode'

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");
const [qrImage, setQrImage] = useState(null)
  const generateQR = async text => {
    try {
      const qr=await QRCode.toDataURL('/'+text)
      setQrImage(qr)
    } catch (err) {
      console.error(err)
    }
  }
  const formatoQR = {
    color: { light: "#ffffeeff", dark: "#00001Eff" },
    errorCorrectionLevel: "H",
    type: "image/png",
    margin: "3",
    quality: 1,
    scale: 4,
  };

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();


    if (data.message && data.name) {
      generateQR(data.name)
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor="name">
        Nombre
        <input type="text" id="name" name="name" required />
      </label>
      <label htmlFor="video">
      video
        <input type="file" id="image" name="image" required />
      </label>
      <label htmlFor="message">
        Mensaje
        <textarea id="message" name="message" required />
      </label>
      <button>Enviar</button>

      {
        qrImage&&
        <img
        alt="qrCode"
        src={qrImage}
        width={100}
        height={100}
        />
      }
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}