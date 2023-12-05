import React from 'react'

export default function LimpiarAsistencia({uidEvento}) {

const handleResetAsitencia=async(uidEvento)=>{
    const res=await fetch('http://localhost:4321/api/eventos',{
        method:'PUT',
        body:JSON.stringify({
            accion:'resetAsistencia',
            uidEvento:uidEvento,
        })
    })
}

  return (
    <button onClick={()=>handleResetAsitencia(uidEvento)} className="w-20 font-medium text-gray-100 text-sm bg-red-500 leading-4 px-3 py-2 hover:bg-red-600 hover:shadow-lg duration-300 rounded-lg">Limpiar CheckIn</button>
  )
}
