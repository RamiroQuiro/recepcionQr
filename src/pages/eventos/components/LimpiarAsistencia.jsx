import React from 'react'
import { showToast } from '../../toast'

export default function LimpiarAsistencia({uidEvento}) {

const handleResetAsistencia = async (uidEvento) => {
    const res = await fetch('http://localhost:4321/api/eventos', {
        method: 'PUT',
        body: JSON.stringify({
            accion: 'resetAsistencia',
            uidEvento: uidEvento,
        })
    });
    const respuesta=await res.json()
    console.log(respuesta.status)
    if (respuesta.status === 200) {
        showToast('CheckIn Limpio');
    }
}
  return (
    <button onClick={()=>handleResetAsistencia(uidEvento)} className="w-20 border border-white/50 active:scale-95 font-medium text-gray-100 text-sm bg-red-500 leading-4 px-3 py-2 hover:bg-red-600 hover:shadow-lg duration-300 rounded-lg">Limpiar CheckIn</button>
  )
}
