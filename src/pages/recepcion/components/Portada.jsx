import { useEffect, useState } from "react";


export default function Portada() {
  const [opctions, setOpctions] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [select, setSelect] = useState(null);

  useEffect(() => {
    const getEventos = async () => {
      try {
        const response = await fetch("/api/eventos");
        const data = await response.json();
        const eventos = await data.eventos;
        setOpctions(eventos);
        console.log(eventos);
      } catch (error) {
        console.error(error);
      }
    };

    getEventos();
  }, []);

  const handleClick = () => {
    setToggle(!toggle);
  };

  const handleSelect = (e) => {
    const selectedOption = opctions.find(
      (option) => option.uid === e.target.value
    );
    setSelect(selectedOption);
    setToggle(false);
  };
  return (
    <>
      {toggle && (
        <div className="bg-white/50 backdrop-blur-sm  top-0 left-0 w-full h-screen flex items-center justify-center z-40 duration-500">
          <div className="p-4 rounded-lg border-2 gap-4 relative flex-col  h-36 text-gray-700 border-gray-200 bg-white flex items-center justify-normal w-1/3">
            <button
              className=" bg-gray-400/70 w-7 h-7  rounded-full absolute top-4 right-3 text-white "
              onClick={handleClick}
            >
              X
            </button>
            <h3 className="text-sm capitalize">elige el evento</h3>
            <select
              onChange={handleSelect}
              name="evento"
              id="selecEvento"
              className="text-xs text-gray-700 rounded px-2 border-transparent focus:ring-o bg-gray-200 py-2"
            >
              <option
                value="selectCamara"
                selected
                disabled
                className="text-xs text-gray-700 p-2"
              >
                Selecciona una opcion
              </option>
              {opctions.map((evento) => (
                <option
                  value={evento.uid}
                  className="text-xs text-gray-700 py-2 px-2"
                >
                  {evento.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div
        id="contenedorVideo"
        className="w-[650px]  h-[70vh] duration-700 rounded-3xl bg-transparent flex flex-col items-center justify-normal p-2"
      >
        <h1
          onClick={handleClick}
          className="cursor-pointer z-10 text-4xl absolute top-5 italic font-bold text-gray-100 drop-shadow-[1px_1px_3px_#555]"
        >
          {select ? select.name : "Selecciona el evento"}
        </h1>
        <video
          src="#"
          className="object-cover opacity-0  absolute top-0 left-0 w-screen h-screen duration-700 "
          id="videoRecepcion"
          autoplay
        ></video>
        <img
          id="portadaRecepcion"
          src={!select ? "/recepcionQR.png" : select.portada}
          alt="Receptor"
          width="1080"
          height="1920"
          className="object-fill object-center absolute top-0 left-0 w-screen bg-gray-800 h-screen"
        />
      </div>
    </>
  );
}
