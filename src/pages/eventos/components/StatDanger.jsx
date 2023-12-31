import { useState } from "react";
import LimpiarAsistencia from "./LimpiarAsistencia";
import LimpiarCredenciales from "./LimpiarCredenciales";

export default function StatDanger({ uidEvento }) {
  const [isHabilitado, setIsHabilitado] = useState(true);

  const handleHabilitar = (e) => {
    setIsHabilitado((state) => e.target.checked);
  };

  return (
    <div className="relative p-2 group w-1/3 h-full flex flex-col items-stretch justify-between bg-clip-border rounded-xl bg-gradient-to-tr from-red-600 to-red-400 shadow-red-500/40   hover:shadow-lg duration-200 text-gray-200 shadow-md">
   
        <label
          htmlFor="isDanger"
          className="flex w-full cursor-pointer items-center justify-center gap-3 font-bold duration-200 font-sans text-sm leading-normal  text-blue-gray-600"
        >
          Zona Danger {isHabilitado ? "❌" : "🖋️"}
          <input
            type="checkbox"
            name="isDanger"
            id="isDanger"
            className="hidden"
            onChange={handleHabilitar}
            checked={isHabilitado}
          />
        </label>
        {isHabilitado ? (
          <div className="flex text-center  justify-evenly my-2 h-10 w-full flex-wrap  gap-x-2">
            <p className="text-sm }">Cambios irreversibles</p>
          </div>
        ) : (
          <div className="flex text-center  justify-evenly my-2 h-10 w-full flex-wrap  gap-x-2">
            <LimpiarAsistencia uidEvento={uidEvento} />
            <LimpiarCredenciales uidEvento={uidEvento} />
          </div>
        )}
    
    </div>
  );
}
