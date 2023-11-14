import { useEffect, useState } from "react";
import { showToast } from "../../toast";

export default function Form() {
  const URL = import.meta.env.URLLOCAL;
  const [responseMessage, setResponseMessage] = useState("");
  const [qrImage, setQrImage] = useState(null);
  const [videook, setVideook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [eventos, setEventos] = useState([]);

  // funcion para cargar el fomulario
  async function submit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const eventoUID = formData.get("eventoUID");
    const videoName = formData.get("name");
    if (!eventoUID || !videoName) {
      setResponseMessage("completa todos los campos");
      return;
    } else {
      formData.append("video", videook);
      try {
        setIsLoading(true);
        const response = await fetch("/api/feedback", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setData(data);
if(data.status==205){
  setResponseMessage('Nombre Duplicado')
  setIsLoading(false)
  setVideook(false);
  e.target.reset();
}else{


        if (data.message && data.name) {
          setIsLoading(false);
          setQrImage(data.qr);
          showToast(`🎞️ Video Cargado`, 3000);
          setResponseMessage(false);
          setVideook(false);
          e.target.reset();
        }}
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setResponseMessage(error);
      }
    }
  }

  const handleVideo = (e) => {
    setVideook(e.target.files[0]);
  };

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch("api/eventos");
        const data = await response.json();
        setEventos(data.eventos);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEventos();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/60 backdrop-blur-sm flex items-center justify-center">
          <div>
            <div class="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="mx-auto animate-pulse text-xs font-medium text-green-500">
              espera, estamos cargando tu video ⌛
            </p>
          </div>
        </div>
      )}
      <form
        onSubmit={submit}
        className="flex flex-col items-center text-gray-700"
      >
        <select
          name="eventoUID"
          id="eventos"
          required
          className="p-2 text-xs rounded-lg my-3 ring-0 border-none"
          onChange={(e) => {
            const selectedEvent = e.target.value;
            formData.append("evento", selectedEvent);
          }}
        >
          <option
            value="noSelect"
            disabled
            selected
            className="text-sx p-2 rounded-lg font-medium text-gray-400"
          >
            Selecciona un Evento
          </option>
          {eventos?.map((event) => (
            <option value={event.uid}>{event.name}</option>
          ))}
        </select>
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
        {!videook ? (
          <label
            htmlFor="video"
            className="my-5 cursor-pointer text-center border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm"
          >
            <p className="mx-auto animate-pulse text-xs font-medium">
              Click aqui para cargar tu video 📂
            </p>
            <input
              type="file"
              id="video"
              name="video"
              required
              accept=".mp4"
              className="hidden"
              onChange={handleVideo}
            />
          </label>
        ) : (
          <div className="my-5 cursor-pointer text-center border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm">
            <p className="mx-auto text-green-400 font-medium">
              Video Cargado 👌🏼{" "}
            </p>
          </div>
        )}
        {isLoading && (
          <span className="text-sm font-medium text-orange-500 animate-pulse">
            cargando video...
          </span>
        )}
        <button
          disabled={isLoading}
          className="disabled:bg-gray-200 cursor-pointer  border flex items-center justify-center hover:bg-blue-400 duration-200 hover:ring-2 bg-blue-500 text-white font-medium rounded-lg p-2 text-center w-2/3 gap-2 text-sm"
        >
          Cargar
        </button>
        {qrImage && (
          <div className="p-2 my-5 space-y-4 flex flex-col items-center">
            <p className="text-xs font-medium">
              Toca la imagen para descargar y usarla como quieras
            </p>
            <a
              className=" mx-auto cursor-pointer"
              href={qrImage}
              download={data.name}
            >
              {" "}
              <img alt="qrCode" src={qrImage} width={100} height={100} />
            </a>
          </div>
        )}
        <span className="text-sm font-thin text-red-500">
          {responseMessage}
        </span>
      </form>
    </>
  );
}
