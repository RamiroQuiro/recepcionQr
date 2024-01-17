import React from 'react'
import HeadTabla from './HeadTabla'
import BodyTabla from './BodyTabla'

export default function TablaCredenciales({ uid }) {

  const serverURL=import.meta.env.PUBLIC_SERVER_URL || '192.168.1.51'

  return (

    <table
      className="min-w-full divide-y-2  divide-gray-200 bg-primary-800 text-sm rounded-lg relative"
    >
      <HeadTabla />
      <BodyTabla uid={uid} serverURL={serverURL} />
    </table>

  )
}
