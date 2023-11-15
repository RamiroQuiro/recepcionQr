import jsQR from "jsqr"; // Importamos la librería jsQR para leer códigos QR
let videoQR;
let streamRef;
let videoRef;
let videosCargados;
const selectorCamaras = document.getElementById("selectorCamara");

// Función para obtener los medios conectados
const obtenerMediosConectados = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === "videoinput");
  } catch (error) {
    console.error("Error al obtener los medios conectados: ", error);
  }
};

// Función para llenar el selector con las cámaras disponibles
const llenarSelector = async () => {
  const camaras = await obtenerMediosConectados();
  camaras.forEach((device) => {
    const option = document.createElement("option");
    option.value = device.deviceId;
    option.text = device.label;
    selectorCamaras.appendChild(option);
  });
};

// Llama a la función para llenar el selector
llenarSelector();

// Función para obtener el video
const getVideo = async () => {
  try {
    const opcionSeleccionada = selectorCamaras.value;
    streamRef = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: opcionSeleccionada, width: 960, height: 540 },
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

// Evento que se dispara cuando se selecciona una opción en el selector
selectorCamaras.addEventListener("change", () => {
  getVideo();
});
// Función para detener el video
const detenerVideo = () => {
  if (videoRef && videoRef.srcObject) {
    videoRef.srcObject.getTracks().forEach((pista) => pista.stop());
    videoRef = null; // Limpia la referencia al video
  }
};
async function cargarModulo() {
  const response = await fetch("/base/base.json");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

cargarModulo()
  .then((data) => {
    videosCargados = data.data.flatMap((objeto) => objeto.videos);
  })
  .catch((e) => {
    console.log("Hubo un error al cargar el módulo: " + e.message);
  });

// Función para escanear el código QR
const scan = () => {
  // Crear un canvas y establecer su tamaño al tamaño del video
  const canvas = document.createElement("canvas");
  canvas.width = videoRef.videoWidth;
  canvas.height = videoRef.videoHeight;

  // Dibujar el video en el canvas
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoRef, 0, 0, canvas.width, canvas.height);

  // Obtener los datos de la imagen del canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Decodificar el código QR de los datos de la imagen
  const code = jsQR(imageData.data, imageData.width, imageData.height);

  // Si el código es válido y contiene datos
  if (code && code.data) {
    const hrefVideo = code.data;

    // Verificar si el hrefVideo existe en videosCargados
    if (!videosCargados.some((video) => video.path === hrefVideo)) {
      // Si el video no existe, mostrar un mensaje de error y volver a escanear
      const errorElement = document.createElement("p");
      errorElement.textContent = "El video no existe";
      errorElement.style.position="fixed"
      errorElement.style.top="20%"
      errorElement.style.left="30%"
      document.body.appendChild(errorElement);
      setTimeout(scan, 300); // Añadido un delay antes de volver a escanear
      return;
    }

    // Si el video existe, reproducirlo
    const contenedorVideo = document.getElementById("contenedorVideo");
    const videoQR = document.getElementById("videoRecepcion");
    contenedorVideo.classList.add("videoActivo");
    videoQR.style.opacity = "1";
    videoQR.style.zIndex= "99";
    videoQR.style.height= "100vh";
    videoQR.style.width= "100vw";
    videoQR.style.top= "0";
    videoQR.style.left= "0"
    videoQR.src = hrefVideo;
    videoQR.play();

    // Cuando el video termine, quitar la clase "videoActivo" y volver a escanear
    videoQR.onended = () => {
      contenedorVideo.classList.remove("videoActivo");
      videoQR.style.opacity = "0";
      videoQR.style.zIndex= "0";
      setTimeout(scan, 300); // Añadido un delay antes de volver a escanear
    };
  } else {
    // Si el código no es válido o no contiene datos, volver a escanear después de un delay
    setTimeout(scan, 300);
  }
};


// Iniciamos la obtención de medios y el video
obtenerMediosConectados();
getVideo();

