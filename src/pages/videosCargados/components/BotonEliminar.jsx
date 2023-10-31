import React from 'react'

export default function BotonEliminar({id}) {

    const handleClick=async()=>{
        console.log(id)
       const res=await fetch('/api/eliminarvideo',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({id:id})
       })

       console.log(res)

    }
  return (
  
<button onClick={handleClick} className="absolute right-5 top-5 text-xl hover:scale-110 duration-150 z-30">❌</button>
  )
}
