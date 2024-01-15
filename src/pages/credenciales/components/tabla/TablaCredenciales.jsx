import React from 'react'
import HeadTabla from './HeadTabla'
import BodyTabla from './BodyTabla'

export default function TablaCredenciales({ uid }) {
  return (

    <table
      className="min-w-full divide-y-2  divide-gray-200 bg-primary-800 text-sm rounded-lg relative"
    >
      <HeadTabla />
      <BodyTabla uid={uid} />
    </table>

  )
}
