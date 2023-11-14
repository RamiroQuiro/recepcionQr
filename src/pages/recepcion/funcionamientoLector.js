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
  const canvas = document.createElement("canvas");
  canvas.width = videoRef.videoWidth;
  canvas.height = videoRef.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoRef, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height);

  // const hrefVideo=code.data
  if (code) {
    const hrefVideo = code.data;

    // El hrefVideo es una dirección válida en la base de datos

    // Verificar si el hrefVideo existe en videosCargados
    if (!videosCargados.some((video) => video.path === hrefVideo)) {
      console.log("no exite el video");
      scan();
      return;
    }
    console.log("este es un video validao");

    const contenedorVideo = document.getElementById("contenedorVideo");

    videoQR = document.getElementById("videoRecepcion");
    contenedorVideo.classList.add("videoActivo");
    videoQR.style.opacity = "1";
    videoQR.style.zIndex= "99";
    videoQR.style.height= "100vh";
    videoQR.style.width= "100vw";
    videoQR.style.top= "0";
    videoQR.style.left= "0"

    videoQR.src = hrefVideo;

    videoQR.play();
    videoQR.onended = () => {
      contenedorVideo.classList.remove("videoActivo");
      videoQR.style.opacity = "0";
    videoQR.style.zIndex= "0";
      scan();
    };
  } else {
    setTimeout(scan, 300);
  }
};

// Iniciamos la obtención de medios y el video
obtenerMediosConectados();
getVideo();
