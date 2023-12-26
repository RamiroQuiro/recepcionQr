import { showToast } from "./toast";
import {mandarToast} from './eventos/components/toastShow'

const modalMensaje = (mensaje, uidEvento, idVideo) => {
  const container = document.getElementById('mensaje-modal');
  const parrafo = document.getElementById('textoModal');
  const closeButton = document.getElementById('botonCerrarModal');
  const botonAceptar = document.getElementById('botonAceptar');

  // Crea un elemento para la notificación
  const children = document.createElement('div');
  children.classList.add('modalMensaje');
  parrafo.textContent = mensaje;

  // Función para cerrar el modal
  const closeModal = () => {
    container.classList.remove('activarModal');
    children.remove();
  };

  // Evento para cerrar el modal
  closeButton.addEventListener('click', closeModal);

  // Evento para el botón de aceptar
  if (!uidEvento && !idVideo) {
    botonAceptar.style.display = 'none';
    botonCerrarModal.textContent = 'aceptar';
    botonCerrarModal.addEventListener('click', closeModal);
  } else {
    const handleConfirm = async () => {
      const res = await fetch("/api/eliminarvideo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uidEvento: uidEvento,
          idVideo: idVideo,
        }),
      });

      mandarToast("Elemento Eliminado");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    };

    botonAceptar.addEventListener('click', handleConfirm);
  }

  // Agrega la notificación al contenedor
  container.appendChild(children);
  // Activar el modal
  container.classList.add('activarModal');
};

export { modalMensaje };
