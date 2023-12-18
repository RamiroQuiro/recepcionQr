import { fabric } from "fabric";
import JSZip from "jszip";

const zip = new JSZip();
// Declaración de constantes y variables
const astroGreet = document.querySelector("astro-greet");
const credenciales = JSON.parse(astroGreet.dataset.credenciales);
const canvas = new fabric.Canvas("canvas");
let coordMarcos = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  angulo: 0,
};

// Configuración inicial del lienzo
configurarLienzo();

// Eventos de los botones
document.getElementById("cargaImg").addEventListener("change", cargarImagen);
document.getElementById("descargaImg").addEventListener("click", descargarImagen);
document.getElementById("addText").addEventListener("click", agregarTexto);
document.getElementById("cargaQR").addEventListener("click", cargarMarcoQR);
document.getElementById("cargaQR").addEventListener("change", cargarImagenQR);
document.getElementById("generateQRS").addEventListener("click", generarQRS);

// Evento de movimiento de objeto
canvas.on("object:moving", actualizarCoordenadas);
canvas.on("object:rotating", actualizarCoordenadas);
canvas.on("object:scaling", actualizarCoordenadas);

function configurarLienzo() {
  const contenedor = document.getElementById("contenedorCanva");
  contenedor.style.background = "transparent";
  canvas.setWidth(660);
  canvas.setHeight(520);
}
// funciones de los botones
function cargarImagen(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);

  fabric.Image.fromURL(url, function (img) {

    
    img.set({
      left: coordMarcos.left,
      top: coordMarcos.top,
    });
    img.scaleToHeight(canvas.getHeight())
    canvas.setWidth(img.getScaledWidth());
    canvas.centerObject(img);
    canvas.add(img);
  });
}

function descargarImagen() {
  const dataURL = canvas.toDataURL({
    format: "png",
    quality: 1,
  });

  const a = document.createElement("a");
  a.download = "RecepcionQr - RamaCode";
  a.href = dataURL;
  a.click();
}

function agregarTexto() {
  const texto = new fabric.Text("Hola mundo", { left: 10, top: 10 });
  canvas.add(texto);
  texto.enterEditing();
}

function cargarMarcoQR() {
  const marco = new fabric.Rect({
    width: 200,
    height: 200,
    name: "marcoQR",
    fill: "transparent",
    stroke: "gray",
    strokeWidth: 2,
    borderRadius: "25%",
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
  const imgFolder = zip.folder("RecepcionQR Rama-Code");

  // Crea un array de promesas
  const promises = credenciales.map((credencial) => {
    return new Promise((resolve, reject) => {
      fabric.Image.fromURL(credencial.QRCode, function (img) {
        ajustarImagen(img);
        canvas.add(img);
        canvas.renderAll();
       
        const dataURL = canvas.toDataURL({
          format: "png",
          quality: 1,
        });

        // Elimina la parte inicial de la URL de datos
        const base64Data = dataURL.split(",")[1];

        // Añade la imagen al archivo ZIP
        imgFolder.file(
          `Credencial-${credencial.nombreApellido}.jpg`,
          base64Data,
          { base64: true }
        );
        canvas.remove(img);
        resolve();
      });
    });
  });

  // Espera a que todas las imágenes se hayan cargado antes de descargar el ZIP
  Promise.all(promises).then(descargarQR);
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

const cargarElQR=()=>{

}

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
