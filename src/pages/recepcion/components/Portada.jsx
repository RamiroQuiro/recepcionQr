import {useEffect} from 'react'

export default function Portada() {

useEffect(() => {


}, [])


  return (
    <div
    id="contenedorVideo"
    className="w-[550px] relative h-[60vh] duration-700 rounded-3xl bg-transparent flex flex-col items-center justify-normal p-2"
  >
    <h1
      className="text-4xl absolute top-5 italic font-bold text-gray-100 drop-shadow-[1px_1px_3px_#555]"
    >
      Rayuela 360
    </h1>
    <video
      src="#"
      className="object-fill opacity-0 z-20 rounded-3xl absolute top-0 left-0 w-full h-full"
      id="videoRecepcion"
      autoplay></video>
    <img
      id="portadaRecepcion"
      src="/recepcionQR.png"
      alt="Receptor"
      width="540"
      height="540"
      className="object-cover object-center w-full rounded-3xl h-full"
    />
  </div>
  
  )
}
