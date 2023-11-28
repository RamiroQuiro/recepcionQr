import React from "react";

export default function Listado() {



// Crear un nuevo objeto EventSource
const source = new EventSource('http://localhost:3000/events');

// Escuchar el evento 'message'
source.onmessage = (event) => {
  console.log(event.data);
};


  return (
    <div>
      <div class="p-10 flex mx-auto w-full items-center justify-center rounded shadow-sm bg-white min-h-[75vh]">
        <ul class="flex flex-col bg-paleta1-secondary rounded-md  p-4 w-full">
          <li class="border-gray-100 flex flex-row text-paleta1-gray mb-2">
            <div class="select-none cursor-pointer  bg-neutral-100 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <div class="flex flex-col rounded-md w-10 h-10 bg-paleta1-primary stroke-gray-500  justify-center items-center mr-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M7 12L9.89075 14.8907V14.8907C9.95114 14.951 10.049 14.9511 10.1094 14.8907V14.8907L17 8"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <div class="flex-1 pl-1 mr-16">
                <div class="font-medium">Ramiro Quiroga</div>
                <div class="text-sm">{"2"} Invitados</div>
              </div>
              <div class="text-paleta1-gray text-sm font-medium flex flex-col items-center">
                <p>Hora</p>
                <p>{"13:20 am"}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
