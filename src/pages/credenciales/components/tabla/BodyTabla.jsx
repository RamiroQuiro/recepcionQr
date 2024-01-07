import {useEffect,useState} from 'react'
import ItemsBodyTabla from './ItemsBodyTabla';

export default function BodyTabla({uid}) {

    const [credenciales, setCredenciales] = useState([]);
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const fetching = await fetch("http://localhost:4321/api/data");
          const dataCredenciales = await fetching.json();
          const filteredCredenciales = dataCredenciales.credenciales.filter((credencial) => {
            if (!uid) {
              return credencial;
            }
            return credencial.evento == uid;
          });
          setCredenciales(filteredCredenciales);
      
          const fetchingEventos = await fetch(`http://localhost:4321/api/eventos`);
          const dataEventos = await fetchingEventos.json();
      
          const eventos = await dataEventos?.eventos;
          setEventos(eventos);
        };
        fetchData();
      }, []); // Agrega 'credenciales' como dependencia aquí
      

  return (
    <tbody class="divide-y divide-gray-200 my-3 text-neutral-800 w-full">
    {
      credenciales?.map((credencial,i) => {
        let nombreVideo, nombreEvento;
        if (!eventos) {
          return;
        }
        const indexEvento = eventos.findIndex(
          (event) => event.uid == credencial.evento
        );
  
        if (indexEvento == -1) {
          nombreVideo = false;
          nombreEvento = false;
        } else {
          nombreEvento = eventos[indexEvento].name;
          nombreVideo = eventos[indexEvento].videos?.find(
            (vid) => vid.id == credencial.video
          )?.name;
        }
  
        return (
          <ItemsBodyTabla
          
            credencial={credencial}
            indice={i}
            evento={nombreEvento}
            video={nombreVideo}
          />
        );
      })
    }
  </tbody>
  
  )
}
