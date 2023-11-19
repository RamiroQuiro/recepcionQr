import { showToast } from "./toast";

  const modalMensaje = (mensaje,uidEvento,idVideo) => {
    // Crea un elemento para la notificación
    const children = document.createElement('div');
    const parrafo=document.getElementById('textoModal')
    children.classList.add('modalMensaje');
    parrafo.textContent = mensaje;

    // Crea un botón para cerrar el modal
    const closeButton = document.getElementById('botonCerrarModal');

    closeButton.addEventListener('click', () => {
        container.classList.remove('activarModal');
        children.remove()
    });
// boton de aceptar
    const botonAceptar=document.getElementById('botonAceptar')
    const handleConfirm = async () => {
        const res = await fetch("/api/eliminarvideo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: !idVideo
            ? JSON.stringify({ uidEvento: uidEvento })
            : JSON.stringify({
                uidEvento: uidEvento,
                idVideo: idVideo,
              }),
        });
    
        showToast("Elemento Eliminado", 25000);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      };
    botonAceptar.addEventListener('click',handleConfirm)
  
    

    const container = document.getElementById('mensaje-modal');
    // Agrega la notificación al contenedor
    container.appendChild(children);
    // Activar el modal
    container.classList.add('activarModal');
}
export  {modalMensaje}