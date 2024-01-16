import {useState, useEffect} from "react";
import CardCheckIn from "./CardCheckIn";

const DES = import.meta.env.PATH_DESARROLLO;
const PRODUC = import.meta.env.PATH_PRODUCCION;
const isDev = import.meta.env.DEV;

export default function Listado({uidEvento,eventoName}) {
 
  const [checkIn, setCheckIn] = useState([]);
  const serverUrl = !isDev  ? PRODUC : DES;


  useEffect(() => {
    // Crear un nuevo objeto EventSource
    const source = new EventSource(`http://${'172.16.0.10'}:8000/event-stream?uidEvento=${uidEvento}`);

    // Escuchar el evento 'message'
    source.onmessage = (event) => {
      // console.log(event.data)
      setCheckIn(JSON.parse(event.data));
      localStorage.setItem('checkInData', JSON.stringify(JSON.parse(event.data)));
    };
  }, [uidEvento]);
  return (

      <div className="md:p-10 p-2 flex mx-auto md:w-10/12 w-full items-stretch justify-center rounded shadow-sm bg-white min-h-full md:min-h-[75vh]">
        <ul className="flex flex-col bg-paleta1-secondary rounded-md  p-4 w-full">
       {checkIn?.map((credencial)=>(
        <CardCheckIn credencial={credencial} key={credencial.uid} eventoName={eventoName}/>
       ))}
        </ul>
      </div>
  );
}
