import { useEffect, useState } from 'react';
import ItemsBodyTabla from './ItemsBodyTabla';

export default function BodyTabla({ uid }) {
  const [credenciales, setCredenciales] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [estado, setEstado] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetching = await fetch('http://localhost:4321/api/data');
        const dataCredenciales = await fetching.json();
        const fetchingEventos = await fetch('http://localhost:4321/api/eventos');
        const dataEventos = await fetchingEventos.json();

        const filteredCredenciales = dataCredenciales.credenciales.map((credencial) => {
          const evento = dataEventos.eventos.find((event) => event.uid === credencial.evento);
          const video = evento?.videos?.find((vid) => vid.id === credencial.video);

          return {
            ...credencial,
            nombreEvento: evento?.name,
            nombreVideo: video?.name,
          };
        });

        setCredenciales(filteredCredenciales);
        setEventos(dataEventos.eventos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [estado]); // Remover 'estado' de las dependencias si no es necesario

  return (
    <tbody className='divide-y divide-gray-200 my-3 text-neutral-800 w-full'>
      {credenciales.map((credencial, i) => (
        <ItemsBodyTabla
        estado={estado}
        setEstado={setEstado}
        setCredenciales={setCredenciales}
          key={i}
          credencial={credencial}
          indice={i}
          evento={credencial.nombreEvento}
          video={credencial.nombreVideo}
        />
      ))}
    </tbody>
  );
}
