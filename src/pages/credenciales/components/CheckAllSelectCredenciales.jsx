import React from 'react'

export default function CheckAllSelectCredenciales({uidEvento}) {
console.log(uidEvento)

const handleCheck=(e)=>{
console.log(e.target)
}

  return (
    <th
    className="text-xs md:text-sm font-mono text-center border-l px-2 relative capitalize py-2 font-medium text-primary-800 cursor-pointer hover:bg-primary-300/20 duration-200"
  >
    <input type="checkbox" name="selectAll" id="selectAll" />
  </th>
  
  )
}
