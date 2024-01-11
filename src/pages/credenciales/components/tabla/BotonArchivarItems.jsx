import React, { useState } from "react";

export default function BotonArchivarItems({uidCredencial,estado,setEstado,}) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleClick(uidCredencial, estado) {
    console.log('dando el click ,',uidCredencial,estado)
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4321/api/credencial/${uidCredencial}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estado: estado,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status == 200) {
        setEstado((estado) => !estado);
        // Aquí podrías actualizar tus datos en lugar de recargar toda la página
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={() => handleClick(uidCredencial, estado)}
      class="flex items-center justify-center overflow-hidden hover:overflow-visible group relative flex-shrink z-20 px-2.5 py-0.5 text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        ></path>
      </svg>
      <span class="absolute bottom-full -left-1 bg-gray-300 group-hover:-translate-y-2 duration-300 group-hover:opacity-100 opacity-0  rounded p-1">
        archivar
      </span>
    </button>
  );
}
