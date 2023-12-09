import {showToast} from '../../toast'

export default function LimpiarCredenciales({uidEvento}) {

    const handleResetAsistencia = async (uidEvento) => {
        const res = await fetch('http://localhost:4321/api/eventos', {
            method: 'PUT',
            body: JSON.stringify({
                accion: 'resetInvitaciones',
                uidEvento: uidEvento,
            })
        });
        const respuesta=await res.json()
       console.log(respuesta)
        if (respuesta.status === 200) {
            showToast('CheckIn Limpio');
            window.location.reload(true);
        }
    }
      return (
        <button onClick={()=>handleResetAsistencia(uidEvento)} className=" border border-white/50 active:scale-95 font-medium text-gray-100 text-xs bg-red-500 leading-4 px-2 py-1 hover:bg-red-600 hover:shadow-lg duration-300 rounded-lg">Limpiar Credenciales</button>
      )
    }
    
