import LimpiarAsistencia from './LimpiarAsistencia'

export default function StatDanger({uidEvento}) {
 
  return (
    

<div class="relative group flex flex-col bg-clip-border rounded-xl bg-red-500  hover:shadow-lg duration-200 text-gray-200 shadow-md md:w-1/5 w-full">
    <div class="bg-clip-border  mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-red-600 to-red-400 text-white shadow-red-500/40 shadow-lg absolute top-1/3 right-[80%] -translate-y-2 group-hover:-translate-y-4 duration-300 grid h-16 w-16 place-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-white">
        <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
        <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd"></path>
        <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
      </svg>
    </div>
    
    <div class="p-4 text-right w-full">
      <label for="isDanger" class="flex w-full items-center justify-center gap-3 font-bold antialiased font-sans text-sm leading-normal  text-blue-gray-600">Zona Danger 
      <input type="checkbox" name="isDanger"  id="isDanger"/></label>
      <div class="flex items-center justify-center mt-1.5 gap-1.5">
    
    <LimpiarAsistencia uidEvento={uidEvento}/>
    <LimpiarAsistencia uidEvento={uidEvento}/>
    </div>
    </div>

  </div>
  
  )
}