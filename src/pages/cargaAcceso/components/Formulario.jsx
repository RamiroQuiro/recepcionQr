import { useEffect, useState } from "react";
import { showToast } from "../../toast";

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");
  const [qrImage, setQrImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  // funcion para cargar el fomulario
  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("evento", selectedEvent.uid);
    formData.append("video", selectedVideo);
    try {
      setIsLoading(true);
      const response = await fetch("/api/data", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setData(data);
      if (data.status == 205) {
        setResponseMessage("Nombre Duplicado");
        setIsLoading(false);
        e.target.reset();
      } else {
        if (data.message && data.name) {
          setIsLoading(false);
          setQrImage(data.qr);
          showToast(`🎞️ Video Cargado`, 3000);
          setResponseMessage(false);
          e.target.reset();
          setTimeout(() => {

          })
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setResponseMessage(error);

    }
  }


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


  useEffect(() => {
    if (selectedEvent) {
      setVideos(selectedEvent.videos);
    }
    console.log(eventos)
  }, [selectedEvent]);


  const handleSelectr = (e) => {
    const seleccion = e.target.value
    const selected = eventos.find((event) => event.uid === seleccion);
    setSelectedEvent(selected);
  }

  const handleSelectVideo = (e) => {
    const videoSelect = e.target.value
    setSelectedVideo(videoSelect)
  }


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
        <div className=" border flex flex-col gap-3 items-center justify-between bg-white rounded-lg p-5 w-full my-5 text-sm">

          <label
            htmlFor="nombreApellido"
            className=" border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm"
          >
            <p>Nombre y Apellido</p>
            <input
              type="text"
              id="nombreApellido"
              name="nombreApellido"
              required
              className="rounded-lg ring-0 border p-2"
            />
          </label>
          <label
            htmlFor="dni"
            className=" border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm"
          >
            <p>DNI</p>
            <input
              type="number"
              id="dni"
              name="dni"
              required
              className="rounded-lg ring-0 border p-2"
            />
          </label>
          <label
            htmlFor="celular"
            className=" border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm"
          >
            <p>Celular</p>
            <input
              type="tel"
              id="celular"
              name="celular"
              required
              className="rounded-lg ring-0 border p-2"
            />
          </label>
          <label
            htmlFor="email"
            className=" border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm"
          >
            <p>email</p>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="rounded-lg ring-0 border p-2"
            />
          </label>
          <label
            htmlFor="cantInvitados"
            className=" border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm"
          >
            <p>Cantidad de Invitados</p>
            <input
              type="number"
              id="cantInvitados"
              name="cantInvitados"
              required
              className="rounded-lg ring-0 border p-2"
            />
          </label>
        </div>


        {/* contenedores de eventos y videos  */}


        <div className=" border flex flex-col gap-3 items-center justify-between bg-white rounded-lg p-5 w-full my-5 text-sm">
          {/* selector de eventos */}
          <select
            name="eventoUID"
            id="eventos"
            required
            className="p-2 text-xs rounded-lg my-3 ring-0 border "
            onChange={handleSelectr}
          >
            <option
              value="noSelect"
              disabled
              selected
              className="text-sx p-2 rounded-lg font-medium text-gray-400"

            >
              Relacionar un Evento
            </option>
            {eventos?.map((event) => (
              <option value={event.uid}>{event.name}</option>
            ))}
          </select>
          {/* selector de videos segun evento correspondiente */}
          <select
            name="eventoUID"
            id="eventos"
            required
            className="p-2 text-xs rounded-lg my-3 ring-0 border"
            onChange={handleSelectVideo}
          >
            <option
              value="noSelect"
              disabled
              selected
              className="text-sx p-2 rounded-lg font-medium text-gray-400"
            >
              Relacionar un Video
            </option>
            {videos?.map((video) => (
              <option value={video.id}>{video.name}</option>
            ))}
          </select>
        </div>
        {isLoading && (
          <span className="text-sm font-medium text-orange-500 animate-pulse">
            cargando credencial...
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
