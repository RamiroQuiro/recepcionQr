import { useEffect, useState } from "react";
import ItemsBodyTabla from "./ItemsBodyTabla";
import { storageContext } from "../../../../context/storeCredenciales";

export default function BodyTabla({ uid }) {
  const [credenciales, setCredenciales] = useState([]);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetching = await fetch("http://localhost:4321/api/data");
        const dataCredenciales = await fetching.json();
        const fetchingEventos = await fetch(
          "http://localhost:4321/api/eventos"
        );
        const dataEventos = await fetchingEventos.json();

        const filteredCredenciales = dataCredenciales.credenciales.map(
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
        storageContext.set((prevContexto) => ({
          ...prevContexto,
          credenciales: filteredCredenciales,
          eventos: dataEventos.eventos,
        }));
        setCredenciales(filteredCredenciales);
        setEventos(dataEventos.eventos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Remover 'estado' de las dependencias si no es necesario

  return (
    <tbody className="divide-y divide-gray-200 my-3 text-neutral-800 w-full">
      {credenciales.map((credencial, i) => (
        <ItemsBodyTabla
          key={i}
          credencial={credencial}
          indice={i}
        />
      ))}
    </tbody>
  );
}
