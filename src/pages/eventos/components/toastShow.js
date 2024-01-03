const mandarToast = (text,opciones={}) => {
  let defaultOpciones={
    time:2500,
    color:false,
    background:false,
    size:false,
    status:200,
  }

  opciones={
    ...defaultOpciones,...opciones
  }
   // Crear un nuevo elemento toast
   const toast = document.createElement('div');
   toast.id = 'toastEvento';
   toast.className = `${opciones.background}  flex top-10 left-50 shadow-lg leading-6 fixed z-50 bg-gray-700 rounded-lg px-5 py-2 text-xs items-center justify-center font-bold opacity-0`;
   toast.style.transition = 'opacity 0.5s, transform 0.5s';
   toast.style.transform= "translateY(-50px)";
   toast.style.opacity = 0;
   toast.style.color = opciones.color && opciones.color;
   toast.style.fontSize = opciones.size && opciones.size;
   toast.innerHTML = text;

   // Añadir el nuevo toast al cuerpo del documento
   document.body.appendChild(toast);

   // Mostrar el toast con animación
   setTimeout(() => {
     toast.style.transform = "translateY(0px)";
     toast.style.opacity = 1;
   }, 100); // Retraso para permitir que el navegador renderice el toast antes de la animación

   // Ocultar el toast después de un tiempo
   setTimeout(()=>{
     toast.style.transition = "opacity 0.5s, transform 0.5s";
     toast.style.opacity = 0;
     toast.style.transform= "translateY(-50px)";
     setTimeout(() => {
       toast.parentElement.removeChild(toast);
     }, 500);
   },opciones.time);
}

export { mandarToast };
