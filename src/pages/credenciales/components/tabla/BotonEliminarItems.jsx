import React from 'react'

export default function BotonEliminarItems({ uidCredencial }) {

    const handleDelete=async(uidCredencial)=>{
       
            try {
                const response = await fetch(`http://localhost:4321/api/credencial/${uidCredencial}`, {
                    method: 'DELETE',
               
                });
                const data = await response.json();
                console.log(data)
               if (data.status==200) {
                
               }
            } catch (error) {
                console.error('Error:', error);
            }
        
    }
  return (
    <button

    onClick={()=>handleDelete(uidCredencial)}
    id={`btnDelete${uidCredencial}`}
    class="inline-flex items-center  px-2.5 overflow-hidden hover:overflow-visible  group relative py-0.5 text-xs bg-red-600 hover:bg-red-700 text-white font-medium rounded-r-md"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      ></path>
    </svg>
    <span class="absolute bottom-full -left-1 bg-red-600 group-hover:-translate-y-2 duration-300 group-hover:opacity-100 opacity-0  rounded p-1">
      eliminar
  </span>
    
  </button>
  
  )
}
