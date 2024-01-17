import { useEffect, useState } from "react";
import ItemsBodyTabla from "./ItemsBodyTabla";
import { storageContext } from "../../../../context/storeCredenciales";
import { useStore } from "@nanostores/react";
import ItemsBody from "../../../../components/skeletor/ItemsBody";

export default function BodyTabla({ uid,serverURL }) {
  const [isLoading, setIsLoading] = useState(false)
  const $contexto = useStore(storageContext)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const fetching = await fetch(`https://${serverURL}:4321/api/data`);
        const dataCredenciales = await fetching.json();
        const fetchingEventos = await fetch(
          `https://${serverURL}:4321/api/eventos`
        );
        const dataEventos = await fetchingEventos.json();

        const filteredCredenciales = dataCredenciales.credenciales.filter((credencial)=>{
          if(!uid){
            return credencial
          }
           return credencial.evento==uid
          })
          .map(
          (credencial) => {
            const evento = dataEventos.eventos.find(
              (event) => event.uid === credencial.evento
            );
            const video = evento?.videos?.find(
              (vid) => vid.id === credencial.video
            );

            return {
              ...credencial,
              nombreEvento: evento?.name,
              nombreVideo: video?.name,
            };
          }
        );
        storageContext.set({
          ...$contexto,
          credenciales: filteredCredenciales,
          eventos: dataEventos.eventos,
        });
        setIsLoading(false)

      } catch (error) {
        setIsLoading(false)
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <tbody className="divide-y divide-gray-200 my-3 text-neutral-800 w-full">
      {
        isLoading ?
          [0, 1, 2, 3, 4, 5].map((i) => (
            <ItemsBody />
          ))

          :
          $contexto.credenciales.map((credencial, i) => (
            <ItemsBodyTabla
              $contexto={$contexto}
              serverURL={serverURL}
              key={i}
              credencial={credencial}
              indice={i}
            />
          ))
      }
    </tbody>
  );
}
