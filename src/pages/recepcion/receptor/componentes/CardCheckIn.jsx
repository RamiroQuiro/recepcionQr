import React from 'react'
import BotonImprimir from './BotonImprimir'

export default function CardCheckIn({ credencial,eventoName }) {



  return (
    <li className="border-gray-100 flex flex-row text-paleta1-gray mb-2 card-transition">
      <div className="select-none cursor-pointer  bg-neutral-100 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
        <div className="flex flex-col rounded-md w-10 h-10 bg-paleta1-primary stroke-gray-500  justify-center items-center mr-4">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 12L9.89075 14.8907V14.8907C9.95114 14.951 10.049 14.9511 10.1094 14.8907V14.8907L17 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>
       <BotonImprimir credencial={credencial} eventoName={eventoName}/>
        <div className="flex-1 pl-1 mr-16">
          <div className="font-medium">{credencial.nombreApellido}</div>
          <div className="text-sm">{credencial.invitados} Invitados</div>
        </div>
        <div className="text-paleta1-gray text-sm font-medium flex flex-col items-center">
          <p>Hora</p>
          <p>{credencial.hora}</p>
        </div>
      </div>
    </li>
  )
}

