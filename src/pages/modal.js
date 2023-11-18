const modalMensaje = (mensaje) => {
    // Crea un elemento para la notificación
    const children = document.createElement('div');
    children.classList.add('modalMensaje');
    children.textContent = mensaje;

    // Crea un botón para cerrar el modal
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.addEventListener('click', () => {
        container.classList.remove('activarModal');
    });
    children.appendChild(closeButton);

    const container = document.getElementById('mensaje-modal');
    // Agrega la notificación al contenedor
    container.appendChild(children);
    // Activar el modal
    container.classList.add('activarModal');
}
export  {modalMensaje}