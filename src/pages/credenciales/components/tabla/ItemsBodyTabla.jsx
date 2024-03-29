import React, { useEffect, useState } from "react";
import BotonEdtar from "./BotonEditar";
import BotonArchivarItems from "./BotonArchivarItems";
import BotonEliminarItems from "./BotonEliminarItems";
import { storageContext } from "../../../../context/storeCredenciales";
import EstadoCredencial from "./EstadoCredencial";

export default function ItemsBodyTabla({
  credencial,
  evento,
  video,
  indice,
  $contexto,
  serverURL
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [estado, setEstado] = useState(true);
  const captaruid = (e) => {
    window.location.href = "/credenciales/" + credencial.uid;
  };
  const uidCredencial = credencial.uid;

  useEffect(() => {
    setEstado(credencial.estado);
    setIsChecked($contexto.selectAllCredencial);
  }, [$contexto.selectAllCredencial]);


  const onCheckedCredencial = (e) => {
    let isBoolean = e.target.checked;
    setIsChecked(isBoolean);
    if (isBoolean) {
      storageContext.set({
        ...$contexto,
        credencialesSelect: [...$contexto.credencialesSelect, credencial.uid],
      });
    } else {
      storageContext.set({
        ...$contexto,
        credencialesSelect: $contexto.credencialesSelect.filter(
          (uid) => uid !== credencial.uid
        ),
      });
    }
  };

  return (
    <tr
      id={`bntCredencial${uidCredencial}`}
      class="odd:bg-neutral-300/50 border-b text-center cursor-pointer text-xs z-10 hover:bg-zinc-400 hover:text-gray-50 duration-200"
    >
      <td class="whitespace-nowrap px-4 py-2 font-medium text-primary-text">
        <input
          onChange={onCheckedCredencial}
          type="checkbox"
          name="checkUid"
          id={`credencial${credencial.uid}`}
          checked={isChecked}
        />
      </td>
      <td class="whitespace-nowrap px-4 py-2 text-primary-text">
        {indice + 1}
      </td>
      <td class="-nowrap px-2 py-2 font-medium text-primary-text">
        {credencial.nombreApellido}
      </td>

      <td class="-nowrap px-2 py-2 text-primary-text">
        {credencial.invitados}
      </td>
      <td class="-nowrap px-2 py-2 text-primary-text">
        {evento == false ? "No Relacionado" : evento}
      </td>
      <td class="-nowrap px-2 py-2 text-primary-text">
        {estado == false ? "" : video}
      </td>
      <EstadoCredencial estado={estado} />
      <td class="-nowrap py-1 text-primary-text flex flex-col items-center text-center text-[10px] gap-y-1 uppercase">
        <div class="flex items-center z-20 flex-shrink flex-wrap">
          <BotonEdtar uidCredencial={uidCredencial} serverURL={serverURL}/>
          <BotonArchivarItems
serverURL={serverURL}
            uidCredencial={credencial.uid}
            setEstado={setEstado}
            estado={estado}
          />
          <BotonEliminarItems
          serverURL={serverURL}
            uidCredencial={uidCredencial}
            $contexto={$contexto}
          />
        </div>
      </td>
      <td class="items-center text-center  uppercase">
        <a href={credencial.QRCode} download={credencial.nombreApellido}>
          <img
            src={credencial.QRCode}
            class="w-8 h-8 object-cover mx-auto"
            alt={`qr${credencial.nombreApellido}`}
          />
        </a>
      </td>
    </tr>
  );
}
