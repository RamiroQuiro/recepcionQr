import React from 'react'

export default function BotonEliminar({id}) {

    const handleClick=async()=>{
       const res=await fetch('/api/eliminarvideo',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({id:id})
       })

       window.location.reload()
    }
  return (
  
<button onClick={handleClick} className="font-black text-xl hover:scale-125 duration-150 z-30 rotate-45 ">+</button>
  )
}
