import { fabric } from "fabric";
import JSZip from "jszip";
import { mandarToast } from "../../../components/toastShow";

const zip = new JSZip();
// Declaración de constantes y variables
const astroGreet = document.querySelector("astro-greet");
// const credenciales = JSON.parse(astroGreet.dataset.credenciales);
const uidEvento = JSON.parse(astroGreet.dataset.uidevento);
const fetcehingEventos=async()=>{
  const resCheckIn = await fetch(`http://localhost:4321/api/eventos/${uidEvento}`);
  const respuesta = await resCheckIn.json();
  return respuesta.acreditaciones[0].acreditaciones
}

const credenciales= await fetcehingEventos()
const canvas = new fabric.Canvas("canvas");
let dimensionesImgOriginal = {
  height: 0,
  width: 0,
};
let coordMarcos = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  angulo: 0,
};
let coordMarcosText = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  angulo: 0,
};

// Configuración inicial del lienzo
configurarLienzo();

// configuraciones de Texto
let colorText = "#1C2128";
const colorTexto = (e) => {
  colorText = e.target.value;
  document.getElementById("svgColorTexto").style.fill = colorText;
};

// obtener tamaño del texto
let tamañoTexto = 16;
const obtenerFontSize = (e) => {
  tamañoTexto = e.target.value;
};

// Eventos de los botones
document.getElementById("cargaImg").addEventListener("change", cargarImagen);
document
  .getElementById("descargaImg")
  .addEventListener("click", descargarImagen);
document.getElementById("colorText").addEventListener("change", colorTexto);
document.getElementById("fontSize").addEventListener("change", obtenerFontSize);
document.getElementById("cargaQR").addEventListener("click", cargarMarcoQR);
document
  .getElementById("cargarMarcoTexto")
  .addEventListener("click", agregarMarcoTexto);
document.getElementById("cargaQR").addEventListener("change", cargarImagenQR);
document.getElementById("generateQRS").addEventListener("click", generarQRS);
document
  .getElementById("enviarMails")
  .addEventListener("click", fetchingMandarMails);

// Evento de movimiento de objeto
canvas.on("object:moving", actualizarCoordenadas);
canvas.on("object:rotating", actualizarCoordenadas);
canvas.on("object:scaling", actualizarCoordenadas);

function configurarLienzo() {
  const contenedor = document.getElementById("contenedorCanva");
  contenedor.style.background = "transparent";
  canvas.setWidth(660);
  canvas.setHeight(660);
}
// funciones de los botones
let imgOriginal; // Variable para guardar la imagen original

function cargarImagen(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);

  fabric.Image.fromURL(url, function (img) {
    // Guarda la imagen original
    imgOriginal = fabric.util.object.clone(img);

    // Escala la imagen para que se ajuste al lienzo
    const scaleFactor = Math.min(
      canvas.getWidth() / img.width,
      canvas.getHeight() / img.height
    );
    img.scale(scaleFactor);

    img.set({
      left: coordMarcos.left,
      top: coordMarcos.top,
    });
    canvas.setWidth(img.getScaledWidth());
    canvas.centerObject(img);
    canvas.add(img);
    canvas.renderAll();
  });
}

function descargarImagen() {
  // Escala la imagen a su tamaño original
  img.scaleToWidth(dimensionesImgOriginal.width);
  img.scaleToHeight(dimensionesImgOriginal.height);

  const dataURL = canvas.toDataURL({
    format: "png",
    quality: 1,
    left: 0,
    top: 0,
    width: dimensionesImgOriginal.with,
    height: dimensionesImgOriginal.height,
  });

  const a = document.createElement("a");
  a.download = "RecepcionQr - RamaCode";
  a.href = dataURL;
  a.click();
}
let textoActual = null; // Variable para guardar el texto actual

function agregarTexto(credencial) {
  eliminarObjetoPorNombre("marcoTexto");
  if (textoActual) {
    canvas.remove(textoActual); // Elimina el texto anterior
  }
  let capitalize =
    credencial.nombreApellido.charAt(0).toUpperCase() +
    credencial.nombreApellido.slice(1);
  const texto = new fabric.Textbox(capitalize, {
    height: coordMarcosText.height,
    width: coordMarcosText.width, // Asegúrate de que el ancho del Textbox no sea mayor que el del marco
    fontSize: coordMarcosText.width / credencial.nombreApellido.length,
    fontFamily: "Arial",
    fill: colorText,
    textAlign: "center",
    originY: "center",
    left: coordMarcosText.left,
    top: coordMarcosText.top + coordMarcosText.height / 2,
  });
  canvas.add(texto);
  textoActual = texto; // Guarda el texto actual
}

function agregarMarcoTexto() {
  const marcoTexto = new fabric.Rect({
    width: 250,
    height: 85,
    name: "marcoTexto",
    fill: "#cecece80",
    stroke: "#F3D5EE", // Cambia el color del borde
    strokeWidth: 2,
    rx: 10, // Agrega bordes redondeados
    ry: 10, // Agrega bordes redondeados
    hasControls: true, // Habilita las esquinas seleccionables
    cornerColor: "#BFDAff", // Cambia el color de las esquinas seleccionables
    cornerSize: 13, // Cambia el tamaño de las esquinas seleccionables
    cornerStyle: "circle",
    cornerStrokeColor: "blue",
    cornerDashArray: [2, 2],
    transparentCorners: false,
  });
  marcoTexto.name = "marcoTexto";
  canvas.add(marcoTexto);
}

function cargarMarcoQR() {
  const marco = new fabric.Rect({
    width: 200,
    height: 200,
    name: "marcoQR",
    fill: "#cecece80",
    stroke: "#F3D5EE", // Cambia el color del borde
    strokeWidth: 2,
    rx: 10, // Agrega bordes redondeados
    ry: 10, // Agrega bordes redondeados
    hasControls: true, // Habilita las esquinas seleccionables
    cornerColor: "#BFDAff", // Cambia el color de las esquinas seleccionables
    cornerSize: 13, // Cambia el tamaño de las esquinas seleccionables
    cornerStyle: "circle",
    cornerStrokeColor: "blue",
    cornerDashArray: [2, 2],
    transparentCorners: false,
  });

  canvas.add(marco);
}

function actualizarCoordenadas(e) {
  if (e.target.name == "marcoQR") {
    const objetoActivo = e.target;

    coordMarcos.left = objetoActivo.left;
    coordMarcos.top = objetoActivo.top;
    coordMarcos.width = objetoActivo.getScaledWidth();
    coordMarcos.height = objetoActivo.getScaledHeight();
    coordMarcos.angulo = objetoActivo.angle;
  }
  if (e.target.name == "marcoTexto") {
    const objetoActivo = e.target;

    coordMarcosText.left = objetoActivo.left;
    coordMarcosText.top = objetoActivo.top;
    coordMarcosText.width = objetoActivo.getScaledWidth();
    coordMarcosText.height = objetoActivo.getScaledHeight();
    coordMarcosText.angulo = objetoActivo.angle;
  }
}

function cargarImagenQR(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);

  fabric.Image.fromURL(url, function (img) {
    ajustarImagen(img);
    canvas.add(img);
    canvas.renderAll();
  });
}

function generarQRS() {
  // Crea una carpeta en el archivo zip para los códigos QR
  const imgFolder = zip.folder("RecepcionQR Rama-Code");

  // Elimina cualquier objeto existente con el nombre "marcoQR"
  eliminarObjetoPorNombre("marcoQR");

  // Crea un array de promesas, una para cada credencial
  const promises = credenciales.map((credencial) => {
    return new Promise((resolve, reject) => {
      fabric.Image.fromURL(credencial.QRCode, function (img) {
        // Añade texto a la credencial
        agregarTexto(credencial);

        // Ajusta el tamaño de la imagen
        ajustarImagen(img);

        // Añade la imagen al lienzo y la renderiza
        canvas.add(img);
        canvas.renderAll();

        // Convierte el lienzo en una URL de datos
        const dataURL = canvas.toDataURL({
          format: "png",
          quality: 1,
          left: 0,
          top: 0,
          width: dimensionesImgOriginal.width,
          height: dimensionesImgOriginal.height,
        });

        // Elimina la parte inicial de la URL de datos para obtener los datos en base64
        const base64Data = dataURL.split(",")[1];

        // Añade la imagen al archivo zip
        imgFolder.file(
          `Credencial-${credencial.nombreApellido}.jpg`,
          base64Data,
          { base64: true }
        );

        // Elimina la imagen del lienzo
        canvas.remove(img);

        // Resuelve la promesa
        resolve();
      });
    });
  });

  // Espera a que todas las imágenes se hayan cargado antes de descargar el archivo zip
  Promise.all(promises).then(() => {
    // Muestra una notificación toast aquí para informar al usuario que se está descargando el archivo zip
    mandarToast("📥 Descargando el archivo ZIP...",{time:5000});
    descargarQR();
  });
}

function ajustarImagen(img) {
  img.scaleToWidth(coordMarcos.width);
  img.scaleToHeight(coordMarcos.height);
  img.set({
    angle: coordMarcos.angulo,
    left: coordMarcos.left,
    top: coordMarcos.top,
  });
}

const cargarElQR = () => {};

function descargarQR() {
  zip.generateAsync({ type: "blob" }).then(function (content) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = "RecepcionQR.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}

// eliminar objetos dentro del canva por el nombre
function eliminarObjetoPorNombre(nombre) {
  const objetos = canvas.getObjects();
  for (let i = 0; i < objetos.length; i++) {
    if (objetos[i].name && objetos[i].name === nombre) {
      canvas.remove(objetos[i]);
      break;
    }
  }
}

// mandar emails de las invitaicones

async function fetchingMandarMails() {
  try {
    // Send email with canvas to each email address in credenciales
    const promises = credenciales.map((credencial) => {
      return new Promise((resolve, reject) => {
        fabric.Image.fromURL(credencial.QRCode, function (img) {
          agregarTexto(credencial);
          ajustarImagen(img);
          canvas.add(img);
          canvas.renderAll();

          const dataURL = canvas.toDataURL({
            format: "png",
            quality: 1,
            left: 0,
            top: 0,
            width: dimensionesImgOriginal.width,
            height: dimensionesImgOriginal.height,
          });
          // Convertir la cadena base64 en un Blob
          let byteCharacters = atob(dataURL.split(",")[1]);
          let byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          let byteArray = new Uint8Array(byteNumbers);
          let blob = new Blob([byteArray], { type: "image/png" });

          // Crear un objeto FormData y agregar el Blob como un archivo
          let formData = new FormData();
          formData.append("image", blob, "image.png");
          formData.append("mail", credencial.email);
          formData.append('uidEvento',uidEvento)
          formData.append("nombreApellido", credencial.nombreApellido);

          // Enviar el formulario multipart/form-data
          fetch("http://localhost:4321/api/sendmailer/router", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((result) => {
             if (result.status==200) {
              console.log(result)
            }
            resolve();
          })
          .catch((error) => {
            console.log(error);
            mandarToast(`🚫 Error al enviar los emails`)
              reject(error);
            });
        });
      });
    });

    await Promise.all(promises).then(()=>{
      mandarToast(`📤✅ Emails enviados correctamente`,{
        size:'20px',
        color:'red'
      })
    });
  } catch (error) {
    // Handle any errors that occur during the fetch reques}}
  }
}
