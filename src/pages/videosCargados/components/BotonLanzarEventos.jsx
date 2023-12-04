import React from 'react'

export default function BotonLanzarEventos({uid}) {


    const lanzarEvento=()=>{
        window.location.href = `recepcion/${uid}`;
    }
    
  return (
   <button 
   onClick={lanzarEvento}
   className='h-10 w-9/12 flex flex-shrink items-center text-sm font-bold px-5 text-gray-600 bg-paleta1-secondary rounded justify-between hover:bg-neutral-500/80 duration-300 hover:text-paleta1-secondary group'>
    Lanzar evento

    <svg viewBox="0 0 48 48" id="b" xmlns="http://www.w3.org/2000/svg" className='fill-transparent group-hover:fill-paleta1-secondary duration-500 stroke-neutral-600  w-8'><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> </defs> <g id="c"> <path id="d" class="g" d="m26.9199,38.3822h10.2185"></path> <path id="e" class="g" d="m32.0292,33.2729v10.2185"></path> <path id="f" class="g" d="m12.3379,43.5l24.8026-24.8016h-11.3789l11.1404-14.1984h-12.5716c-1.25,0-2.4051.6667-3.0301,1.7493l-10.4409,18.0849h8.9398l-7.4613,19.1658Z"></path> </g> </g></svg>
   </button>
  )
}
