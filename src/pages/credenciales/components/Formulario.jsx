import {useState} from "react";
import { showToast } from "../../toast";
import { modalMensaje } from "../../modal";

export default function Formulario({ credencial, eventos, videos }) {


    const [newData, setNewData] = useState(credencial)

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setNewData((newData) => ({
            ...newData,
            [e.target.name]: e.target.value
        }));
    };
  const handleModificar = async (e, uidEvento) => {
    e.preventDefault();
setIsLoading(true)
    try {
      const data = new FormData();
      data.append("nombreApellido", newData.nombreApellido);
      data.append("dni", newData.dni);
      data.append("email", newData.email);
      data.append("celular", newData.celular);
      data.append("evento", newData.evento);
      data.append("video", newData.video);
      data.append("invitados", newData.invitados);
      const fetiiching = await fetch(
        `http://localhost:4321/api/credencial/${credencial.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(data)), // Reemplazar 'nuevoEstado' con el nuevo estado deseado
        }
      );

      const dataRes = await fetiiching.json();
    if (dataRes.status==200) {
        setIsLoading(false)
       modalMensaje('credencial modificada, QR regenerado')
         
    }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  return (
    <>

    <form className="flex flex-col items-center text-gray-700">
      <div className="border flex flex-col gap-3 items-center justify-between bg-white rounded-lg p-10 w-full my-5 text-sm">
        <label
          htmlFor="nombreApellido"
          className="border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm"
        >
          <p>Nombre y Apellido</p>
          <input
            type="text"
            id="nombreApellido"
            name="nombreApellido"
            onChange={handleChange}
            required
            value={newData.nombreApellido}
            className="rounded-lg ring-0 border p-2"
          />
        </label>
        <label
          htmlFor="dni"
          className="border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm"
        >
          <p>DNI</p>
          <input
            type="number"
            value={newData.dni}
            onChange={handleChange}
            id="dni"
            name="dni"
            required
            className="rounded-lg ring-0 border p-2"
          />
        </label>
        <label
          htmlFor="celular"
          className="border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm"
        >
          <p>Celular</p>
          <input
            value={newData.celular}
            onChange={handleChange}
            type="tel"
            id="celular"
            name="celular"
            required
            className="rounded-lg ring-0 border p-2"
          />
        </label>
        <label
          htmlFor="email"
          className="border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm"
        >
          <p>Email</p>
          <input
            value={newData.email}
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            required
            className="rounded-lg ring-0 border p-2"
          />
        </label>
        <label
          htmlFor="invitados"
          className="border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm"
        >
          <p>Cantidad de Invitados</p>
          <input
            value={newData.invitados}
            onChange={handleChange}
            type="number"
            id="invitados"
            name="invitados"
            required
            className="rounded-lg ring-0 border p-2"
          />
        </label>
      </div>

      {/* contenedores de eventos y videos  */}

      <div className="border flex flex-col gap-3 items-center justify-between bg-white rounded-lg p-5 w-full my-5 text-sm">
        {/* selector de eventos */}
        <select
          name="evento"
          id="eventos"
          required
          onChange={handleChange}
          className="p-2 text-xs rounded-lg my-3 ring-0 border w-full"
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
            <option key={event.uid} value={event.uid}>{event.name}</option>
          ))}
        </select>
        {/* selector de videos segun evento correspondiente */}
        <select
          name="idVideos"
          id="idVideos"
          required
          onChange={handleChange}
          className="p-2 text-xs rounded-lg my-3 ring-0 border w-full"
        >
          <option
            value="noSelect"
            disabled
            selected
            className="text-sx p-2 rounded-lg font-medium text-gray-400"
          >
            Relacionar un Video
          </option>
          {videos
            ?.filter((evento) => evento.uid === credencial.evento)[0]
            ?.videos?.map((video) => (
              <option key={video.id} value={video.id}>{video.name}</option>
            ))}
        </select>
        <button
          onClick={(e) => handleModificar(e, credencial.uid)}
          className="disabled:bg-gray-200 cursor-pointer  border flex items-center justify-center hover:bg-blue-400 duration-200 hover:ring-2 bg-blue-500 text-white font-medium rounded-lg p-2 text-center w-2/3 gap-2 text-sm"
        >
          Modificar
        </button>
      </div>

      {credencial?.QRCode && (
        <div className="p-2 my-5 space-y-4 flex flex-col items-center">
          <p className="text-xs font-medium">
            Toca la imagen para descargar y usarla como quieras
          </p>
          <a
            className=" mx-auto cursor-pointer"
            href={credencial?.QRCode}
            download={credencial.nombreApellido}
          >
            {" "}
            <img
              alt="qrCode"
              src={credencial?.QRCode}
              width={100}
              height={100}
            />
          </a>
        </div>
      )}
    </form>
    </>
  );
}
