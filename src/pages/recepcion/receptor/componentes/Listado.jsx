import {useState, useEffect} from "react";
import CardCheckIn from "./CardCheckIn";

export default function Listado({uidEvento}) {


  const [checkIn, setCheckIn] = useState([]);

  useEffect(() => {
    // Crear un nuevo objeto EventSource
    const source = new EventSource('http://localhost:8000/event-stream?uidEvento=' + uidEvento);

    // Escuchar el evento 'message'
    source.onmessage = (event) => {
      console.log(event.data)
      setCheckIn(JSON.parse(event.data));
    };
  }, [uidEvento]);

  return (

      <div className="p-10 flex mx-auto md:w-10/12 w-11/12 items-stretch justify-center rounded shadow-sm bg-white min-h-[75vh]">
        <ul className="flex flex-col bg-paleta1-secondary rounded-md  p-4 w-full">
       {checkIn?.map((credencial)=>(
        <CardCheckIn credencial={credencial} key={credencial.uid}/>
       ))}
        </ul>
      </div>
  );
}
