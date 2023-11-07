import jsQR from 'jsqr' // Importamos la librería jsQR para leer códigos QR

  // Referencias a los botones de prender y apagar
  // const bottonPrender=document.getElementById('prender')
  // const bottonApagar=document.getElementById('apagar')
  // Referencias al stream y al video
  let streamRef;
  let videoRef;

  // Función para obtener los medios conectados
  const obtenerMediosConectados = async () => {
    const getDevices = () => navigator.mediaDevices.enumerateDevices();
    try {
      const mediaDevices = await getDevices().then((devices) => {
        let opcionesDeCamaras = [];
        // Recorremos los dispositivos y guardamos las cámaras
        for (const devicesInfo of devices) {
          if (devicesInfo.kind == "videoinput") {
            opcionesDeCamaras.push({
              value: devicesInfo.deviceId,
              label: devicesInfo.label,
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Función para obtener el video
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 960 , height:540 },
        audio: true,
      })
      .then((stream) => {
        streamRef = stream;
        if (streamRef) {
          videoRef = document.querySelector('video');
          videoRef.srcObject = stream;
          videoRef.play();
          // Cuando el video esté cargado, iniciamos el escaneo
          videoRef.addEventListener('loadedmetadata', () => {
            scan();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Función para detener el video
  const detenerVideo = () => {
    videoRef.srcObject.getTracks().forEach(pista => {
      pista.stop(); // Detiene cada pista del video
    });
    videoRef = document.querySelector('video');
    videoRef = null; // Limpia la referencia al video
  };

  // Función para escanear el código QR
  function scan() {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.videoWidth;
    canvas.height = videoRef.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
    //   console.log("Código QR encontrado: " + code.data);
      window.location.href = code.data;
    } else {
      setTimeout(scan, 300);
    }
  }

  // Evento para iniciar el video
  bottonPrender.addEventListener('click', () => {
    videoRef = document.querySelector('video');
    obtenerMediosConectados();
    getVideo(); // Llama a la función para obtener el video
  });

  // Evento para detener el video
  bottonApagar.addEventListener('click', () => {
    detenerVideo(); // Llama a la función para detener el video
    videoRef.hidden = true; // Oculta el video
  });

