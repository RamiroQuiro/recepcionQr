import React from 'react'

export default function EstadoCredencial({estado}) {
  return (
    <td class="-nowrap text-primary-text">
    <p
      class={
        estado == true
          ? " bg-green-300/50 shadow-sm w-8/12 py-1 duration-300 shadow-green-300 text-green-600 rounded-lg text-xs mx-auto text-center"
          : " bg-red-300/50 shadow-sm w-8/12 py-1 duration-300 shadow-red-300 text-red-600 rounded-lg text-xs mx-auto  text-center"
      }
    >
      {estado == true ? "activo" : "inactivo"}
    </p>
  </td>
  )
}
