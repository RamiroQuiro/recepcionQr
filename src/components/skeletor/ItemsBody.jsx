import React from 'react'

export default function ItemsBody() {
  return (
    <tr
    class="odd:bg-neutral-300/50 border-b animate-pulse text-center cursor-pointer text-xs z-10 hover:bg-zinc-400 hover:text-gray-50 duration-200"
  >
    <td class="whitespace-nowrap px-4 py-2 font-medium text-primary-text">
      <input
        type="checkbox"
        name="checkUid"
      />
    </td>
    <td class="whitespace-nowrap px-4 py-2 text-primary-text">
    </td>
    <td class="-nowrap px-2 py-2 font-medium text-primary-text">
    </td>

    <td class="-nowrap px-2 py-2 text-primary-text">
    </td>
    <td class="-nowrap px-2 py-2 text-primary-text">
    </td>
    <td class="-nowrap px-2 py-2 text-primary-text">
    </td>
    <td class="-nowrap py-1 text-primary-text flex flex-col items-center text-center text-[10px] gap-y-1 uppercase">
    </td>
    <td class="items-center text-center  uppercase">
        <img
          class="w-8 h-8 object-cover mx-auto"
        />
    </td>
  </tr>
  )
}
