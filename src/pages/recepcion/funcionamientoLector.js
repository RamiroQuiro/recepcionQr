import jsQR from "jsqr"; // Importamos la librería jsQR para leer códigos QR
let videoQR;
let streamRef;
let videoRef;

// Función para obtener los medios conectados
const obtenerMediosConectados = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    let opcionesDeCamaras = devices.filter(
      (device) => device.kind === "videoinput"
    );
  } catch (error) {
    console.error("Error al obtener los medios conectados: ", error);
  }
};

// Función para obtener el video
const getVideo = async () => {
  try {
    streamRef = await navigator.mediaDevices.getUserMedia({
      video: { width: 960, height: 540 },
      audio: true,
    });
    videoRef = document.getElementById("lectorQr");
    videoRef.srcObject = streamRef;
    videoRef.play();
    // Cuando el video esté cargado, iniciamos el escaneo
    videoRef.addEventListener("loadedmetadata", scan);
  } catch (error) {
    console.error("Error al obtener el video: ", error);
  }
};

// Función para detener el video
const detenerVideo = () => {
  if (videoRef && videoRef.srcObject) {
    videoRef.srcObject.getTracks().forEach((pista) => pista.stop());
    videoRef = null; // Limpia la referencia al video
  }
};

// Función para escanear el código QR
const scan = () => {
  const canvas = document.createElement("canvas");
  canvas.width = videoRef.videoWidth;
  canvas.height = videoRef.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoRef, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height);
  if (code) {
    const hrefVideo = code.data;
    const contenedorVideo = document.getElementById("contenedorVideo");
    videoQR = document.getElementById("videoRecepcion");
    contenedorVideo.classList.add("videoActivo");
    videoQR.style.opacity = "1";
    videoQR.src = hrefVideo;

    videoQR.play();
    videoQR.onended = () => {
      contenedorVideo.classList.remove("videoActivo");
      videoQR.style.opacity = "0";
      scan()
    };
  } else {
    setTimeout(scan, 300);
  }
};

// Iniciamos la obtención de medios y el video
obtenerMediosConectados();
getVideo();
