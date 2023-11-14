function showToast(message, duration) {
    // Crea un elemento para la notificación
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
  
    // Agrega la notificación al contenedor
    const container = document.getElementById('toast-container');
    container.appendChild(toast);
  
    // Establece un temporizador para ocultar la notificación después de la duración especificada
    setTimeout(() => {
      toast.remove();
    }, duration);
  }

export { showToast };
