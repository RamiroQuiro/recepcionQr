import React from "react";
import { useStore } from "@nanostores/react";

import ItemCabeceraTabla from "./ItemCabeceraTabla";
import { storageContext } from "../../../../context/storeCredenciales";
export default function HeadTabla() {
  const $isContext = useStore(storageContext);
  let estadoContexto = storageContext.get();
  const cabeceras = [
    {
      key: 2,
      id: 2,
      name: "N°",
    },
    {
      key: 3,
      id: 3,
      name: "Nombre y Apellido",
    },
    {
      key: 4,
      id: 4,
      name: "Invitados",
    },
    {
      key: 5,
      id: 5,
      name: "Evento",
    },
    {
      key: 6,
      id: 6,
      name: "video",
    },
    {
      key: 7,
      id: 7,
      name: "estado",
    },
    {
      key: 8,
      id: 8,
      name: "accion",
    },
    {
      key: 9,
      id: 9,
      name: "QR",
    },
  ];

  const onChecked = (e) => {
    let boolCheck = e.target.checked;
    storageContext.set({
      ...estadoContexto,
      selectAllCredencial: boolCheck,
    });
  };
  return (
    <thead class="text-left ltr:text-left rtl:text-right bg-zinc-600 rounded-lg z-30 py-2 sticky top-0 left-0">
      <tr class="px-1 ">
        <th
          onChange={onChecked}
          id="selectAllCredencial"
          class="text-xs md:text-sm font-mono text-center border-l px-2 relative capitalize py-2 font-medium text-primary-800 cursor-pointer hover:bg-primary-300/20 duration-200"
        >
          <input type="checkbox" name="selectAll" id="selectAll" />
        </th>
        {cabeceras?.map((item, i) => (
          <ItemCabeceraTabla key={item.key} id={item.id} label={item.name} />
        ))}
      </tr>
    </thead>
  );
}
