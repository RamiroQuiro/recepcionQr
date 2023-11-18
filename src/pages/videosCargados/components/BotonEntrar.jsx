import React from 'react'

export default function BotonEntrar({uid}) {
 

   return (
   
 <a href={`/eventos/${uid}`} className="font-black text-xl  hover:scale-125 duration-150 z-30  flex items-center text-center    bg-white rounded-full px-2 py-0.5 before:">&#8702;</a>
  )
}
