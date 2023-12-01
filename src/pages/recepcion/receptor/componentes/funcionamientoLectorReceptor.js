import jsQR from "jsqr"; // Importamos la librería jsQR para leer códigos QR
let videoQR;
let streamRef;
let videoRef;
let videosCargados;
const selectorCamaras = document.getElementById("selectorCamara");
const videEquivocado = document.getElementById("videoEquivocado");

/** Traer UID del cliente */




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

// Antes de la función scan
let scanning = true;
let intentos = 0;
const maxIntentos = 800;
// Función para escanear el código QR
// Función para escanear el código QR
const scan = async () => {
  // if (!scanning || intentos >= maxIntentos) return;
  videEquivocado.classList.remove("videoError");

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
    try {
      const token = code.data;
      const res = await fetch("http://localhost:4321/api/verify", {
        headers: {
          Authorization: "Bearer " + token + " evento " + uidEvento,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const { evento, video } = data.decodificacion;
          const isOk = data.status == 200 || data.status == 205;

          if (isOk) {
            isVideoOk(evento, video, delay, scan);
          }
        });

      await delay(300);
      intentos++;
      await scan(); // Volver a escanear
    } catch (error) {
      console.error(error);
      await delay(300);
      intentos++;
      await scan(); // Volver a escanear
    }
  } else {
    // Si el código no es válido o no contiene datos, volver a escanear después de un delay
    await delay(300);
    intentos++;
    await scan(); // Volver a escanear
  }

  // Liberar la memoria del canvas después de cada escaneo
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = 0;
  canvas.height = 0;
};
// Función para crear una promesa que se resuelve después de un tiempo determinado
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Iniciamos la obtención de medios y el video
obtenerMediosConectados();
getVideo();
