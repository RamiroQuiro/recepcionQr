import React from 'react'

export default function ItemsBodyTabla({credencial,indice}) {

console.log(indice)
    const captaruid=(e)=>{
      console.log(credencial.uid)
        window.location.href = '/credenciales/' + credencial.uid;
    }
  return (
    <tr
            onClick={(e) => captaruid(e, credencial.uid)}
            key={credencial.uid}
            className="odd:bg-neutral-300/50 cursor-pointer hover:bg-zinc-400 hover:text-gray-50 duration-200"
          >
            <td className="whitespace-nowrap px-4 py-2 font-medium text-primary-text">
              <input type="checkbox" name="checkUid" id="checkUid" />
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-primary-text">
              {indice}
            </td>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-primary-text">
              {credencial.nombreApellido}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-primary-text">
              {credencial.dni}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-primary-text">
              {credencial.invitados}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-primary-text">
              {credencial.evento}
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-primary-text">
              {credencial.video}
            </td>
            <td className="whitespace-nowrap  text-primary-text">
              <p
                className={
                  credencial.activo == true
                    ? " bg-green-300/50 shadow-sm w-10/12  shadow-green-300 text-green-600 rounded-lg text-[10px] mx-auto text-center"
                    : " bg-red-300/50 shadow-sm w-10/12  shadow-red-300 text-red-600 rounded-lg text-xs mx-auto text-[10px] text-center"
                }
              >
                {credencial.activo == true ? "activo" : "inactivo"}
              </p>
            </td>
            <td className="whitespace-nowrap  text-primary-text">
              dsd
            </td>
          </tr>
  )
}
