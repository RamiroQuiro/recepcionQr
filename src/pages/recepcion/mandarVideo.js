const isVideoOk=async (evento,video)=>{
if(!video)return

 // Si el video existe, reproducirlo
 const videoQR = document.getElementById("videoRecepcion");
 videoQR.classList.add("aparecer");
const hrefVideo=`http://localhost:4321/upload/${evento}/${video}.mp4`
 videoQR.src = hrefVideo;
 videoQR.play();

 // Esperar a que el video termine de reproducirse
 await new Promise((resolve) => {
   videoQR.onended = resolve;
 });

 videoQR.classList.remove("aparecer");

 await delay(300); // Añadido un delay antes de volver a escanear
 await scan();

}

export default isVideoOk