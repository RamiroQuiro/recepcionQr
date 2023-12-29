import {useEffect,useState,useRef} from "react";

export default function ListadoCredencialesCheckIn({ uid }) {

const [dataEvento, setDataEvento] = useState({})
const [sseCheckIn, setSseCheckIn] = useState([])
const [porcentajeAcreditaciones, setPorcentajeAcreditaciones] = useState(0)
const [porcentajeCheckIn, setPorcentajeCheckIn] = useState(0)
const refContenedor = useRef();
useEffect(() => {
  const fetching = async () => {
    const resCheckIn = await fetch(`http://localhost:4321/api/eventos`);
    const respuesta = await resCheckIn.json();
    
    const evento = respuesta?.eventos?.find((evento) => evento.uid == uid);
    
    setDataEvento({
      acreditaciones: evento.acreditaciones,
    });
   
  };

  fetching();


}, []);
useEffect(() => {
  // Crear un nuevo objeto EventSource
  const source = new EventSource('http://localhost:8000/event-stream?uidEvento=' + uid);

  // Escuchar el evento 'message'
  source.onmessage = (event) => {
    console.log(event.data)
    setSseCheckIn(JSON.parse(event.data))
    localStorage.setItem('checkInData', JSON.stringify(JSON.parse(event.data)));
  };
  return () => {
    source.close();
  };
}, [uid]);

useEffect(() => {


    const total = dataEvento?.acreditaciones?.length
    
    if(dataEvento?.acreditaciones?.length==0){
      setPorcentajeAcreditaciones(100)
    }else{

      setPorcentajeAcreditaciones(((dataEvento?.acreditaciones?.length -sseCheckIn?.length) / total) * 100);
      setPorcentajeCheckIn((sseCheckIn?.length / total) * 100)
    }

    // console.log('Porcentaje de acreditaciones', porcentajeAcreditaciones);
    // console.log('Porcentaje de checkIn', porcentajeCheckIn);

  
}, [dataEvento,porcentajeAcreditaciones,porcentajeCheckIn,sseCheckIn]);

  return (
    <div className="">
      <h1>Total de Credenciales {dataEvento?.acreditaciones?.length || 0}</h1>

      <div
   
      className="w-full h-10 my-10 bg-white/50  cursor-pointer backdrop-blur-sm  rounded-lg  border-2 border-gray-500/50 flex items-center relative">

        {/* contenedor de asistentes */}
        <div
        style={{
          width: `calc(${porcentajeCheckIn}% )`,
        }}
        className={` bg-gradient-to-tr from-blue-600/80 to-blue-400/80 rounded-l-md  backdrop-blur-sm duration-500 absolute group top-0 left-0 h-full `}>
          <div className="w-full h-full relative flex items-center">
            <span className="z-10 mx-auto bg-white rounded-full text-sm font-bold py-1 px-2.5 border-2 ">
              {" "}
              {sseCheckIn?.length || 0}
            </span>
            <span className="absolute bottom-full text-xs font-bold opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 duration-300">
              Credenciales Ingresadas
            </span>
          </div>
        </div>
        <div

        style={{
          width: `calc(${porcentajeAcreditaciones}%)`
        }}
        className={`${porcentajeAcreditaciones==0&&'hidden'} bg-gradient-to-tr from-red-500/90 to-red-400/80 rounded-r-md backdrop-blur-sm group duration-500  absolute top-0 right-0 h-full  border-l-2 rounded-l-lg border-white/80 `}>
        <div className="w-full h-full  text-right relative flex items-center">
            <span className="z-10 mx-auto bg-white/70 rounded-full text-xs font-bold py-1 px-2 border-2  duration-300 ">
              {" "}
              {(dataEvento?.acreditaciones?.length - sseCheckIn?.length) || 0}
            </span>
            <span className="absolute bottom-full text-xs font-bold opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 duration-300">
              Credenciales No Ingresadas
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
