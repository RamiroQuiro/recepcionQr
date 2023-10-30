import { FormEvent, useState } from "react";

export default function Form() {
  const URL = import.meta.env.URLLOCAL;
  const [responseMessage, setResponseMessage] = useState("");
  const [qrImage, setQrImage] = useState(null);
  const [videook, setVideook] = useState(null)
  const [data, setData] = useState(null)

  
  

// funcion para cargar el fomulario
  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('video',videook)
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
  setData(data)
    if (data.message && data.name) {
      setQrImage(data.qr);
      setResponseMessage(data.message);
    }
  }



  const handleVideo=(e)=>{
    setVideook(e.target.files[0])
  }
  return (
    <form
      onSubmit={submit}
      className="flex flex-col items-center text-gray-700"
    >
      <label
        htmlFor="name"
        className="my-5 border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm"
      >
        <p>Mesa N°</p>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="rounded-lg ring-0 border p-2"
        />
      </label>
     {
     !videook?

     <label
        htmlFor="video"
        className="my-5 cursor-pointer text-center border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm"
      >
        <p className="mx-auto animate-pulse text-xs font-medium">Click aqui para cargar tu video 📂</p>
        <input
          type="file"
          id="video"
          name="video"
          required
          className="hidden"
          onChange={handleVideo}
        />
      </label>
    : 
    <div className="my-5 cursor-pointer text-center border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm"
    >
      <p className="mx-auto text-green-400 font-medium">Video Cargado 👌🏼 </p>
    </div>  
    }

      <button className=" cursor-pointer  border flex items-center justify-center hover:bg-blue-400 duration-200 hover:ring-2 bg-blue-500 text-white font-medium rounded-lg p-2 text-center w-2/3 gap-2 text-sm"
    >Enviar</button>
      {qrImage &&
      <div className="p-2 my-5 space-y-4 flex flex-col items-center">
        <p>Toca la imagen para descargar y usarla como quieras</p>
      <a className=" mx-auto cursor-pointer" href={qrImage} download={data.name}> <img alt="qrCode" src={qrImage} width={100} height={100} /></a>
      </div>
      }
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
