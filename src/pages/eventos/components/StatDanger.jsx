import {useState} from 'react'
import LimpiarAsistencia from "./LimpiarAsistencia";
import LimpiarCredenciales from './LimpiarCredenciales';

export default function StatDanger({ uidEvento }) {
const [isHabilitado, setIsHabilitado] = useState(true)

const handleHabilitar=(e)=>{

  setIsHabilitado((state)=>(e.target.checked));
}

  return (
    <div className="relative p-2 group flex flex-col items-stretch justify-between bg-clip-border rounded-xl bg-gradient-to-tr from-red-600 to-red-400 shadow-red-500/40   hover:shadow-lg duration-200 text-gray-200 shadow-md w-1/3 md:w-full">
      <div className=" text-right w-full h-full flex flex-col items-center justify-between">
        <label
          htmlFor="isDanger"
          className="flex w-full cursor-pointer items-center justify-center gap-3 font-bold antialiased font-sans text-sm leading-normal  text-blue-gray-600"
        >
          Zona Danger  {isHabilitado?'❌':'🖋️'}
          <input type="checkbox" name="isDanger" id="isDanger" className='hidden' onChange={handleHabilitar} checked={isHabilitado} />
        </label>
{isHabilitado?
(
  <div className=' h-full w-full text-center text-sm my-3 '>Cambios irreversibles</div>
)

:(       <div className="flex items-center justify-center  flex-wrap mt-1.5 gap-1.5">
          <LimpiarAsistencia uidEvento={uidEvento} />
          <LimpiarCredenciales uidEvento={uidEvento} />
        </div>)}
      </div>
    </div>
  );
}
