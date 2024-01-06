import React from 'react'

export default function BotonEditar({uidCredencial}) {


    const handleClick=()=>{
        window.location.href = `/credenciales/${uidCredencial}`;
    }
  return (
    <button
    onClick={handleClick}
    id={`btnEditar${uidCredencial}`}
    class="inline-flex relative items-center overflow-hidden hover:overflow-visible flex-shrink z-20 group px-2.5 py-0.5 text-xs bg-green-300 hover:bg-green-400 text-gray-800 font-medium rounded-l-md"
  >
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
  <span class="absolute bottom-full left-0 bg-green-300 group-hover:-translate-y-2 duration-300 group-hover:opacity-100 opacity-0  rounded p-1">
      editar
  </span>
  </button>
  
  )
}
