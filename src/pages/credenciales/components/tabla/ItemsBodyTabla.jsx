import React, { useEffect,useState } from "react";
import BotonEdtar from "./BotonEditar";
import BotonArchivarItems from "./BotonArchivarItems";
import { storageContext } from "../../../../context/storeCredenciales";
import { useStore } from "@nanostores/react";

export default function ItemsBodyTabla({ credencial, evento, video, indice }) {
  const $isContexto=useStore(storageContext)
  let contextoActual=storageContext.get()
  const captaruid = (e) => {
    window.location.href = "/credenciales/" + credencial.uid;
  };
  const uidCredencial = credencial.uid;

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(contextoActual.selectAllCredencial);
  }, [contextoActual.selectAllCredencial]);
  
  const onCheckedCredencial = (e) => {
    setIsChecked(e.target.checked);
    storageContext.set({
      ...contextoActual,
      credencialesSelect: [...contextoActual.credencialesSelect, credencial.uid],
    });
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
        {credencial.estado == false ? "No Relacionado" : video}
      </td>
      <td class="-nowrap text-primary-text">
        <p
          class={
            credencial.estado == true
              ? " bg-green-300/50 shadow-sm w-8/12 py-1 shadow-green-300 text-green-600 rounded-lg text-xs mx-auto text-center"
              : " bg-red-300/50 shadow-sm w-8/12 py-1  shadow-red-300 text-red-600 rounded-lg text-xs mx-auto  text-center"
          }
        >
          {credencial.estado == true ? "activo" : "inactivo"}
        </p>
      </td>
      <td class="-nowrap py-1 text-primary-text flex flex-col items-center text-center text-[10px] gap-y-1 uppercase">
        <div class="flex items-center z-20 flex-shrink flex-wrap">
          <BotonEdtar uidCredencial={uidCredencial} />
          <BotonArchivarItems
            uidCredencial={uidCredencial}
            estado={credencial.estado}
          />
          {/* <BotonEliminarItems uidCredencial={uidCredencial} />  */}
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
