import React from 'react'

export default function ItemCabeceraTabla({ id, label, order }) {
  return (
    <th
    id={id}
    class="text-xs md:text-sm font-mono text-center border-l px-2 relative capitalize py-2 font-medium text-primary-800 cursor-pointer hover:bg-primary-300/20 duration-200"
  >
    {label}
    <span class="duration-200 animate-aparecer absolute top-2 right-2">
      {order == id && "⬇️"}
    </span>
  </th>
  )
}
