import React from 'react'

export default function BotonEntrar({uid}) {
 

   return (
   
 <a href={`/eventos/${uid}`} className="font-black text-xl  hover:scale-125 duration-150 z-30  flex items-center text-center pl-1   bg-white rounded-full w-8 h-8  before:">→</a>
  )
}
