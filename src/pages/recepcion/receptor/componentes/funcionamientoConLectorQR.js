// Declara 'code' fuera de la función del evento
let token = "";

window.addEventListener("keydown", async function (event) {
  // Asegúrate de que el evento no sea una tecla especial (por ejemplo, shift, ctrl, alt, etc.)
  if (event.key.length === 1) {
    // Agrega la tecla presionada al valor de entrada
    token += event.key;
  }

  // Si se presiona la tecla Enter, asume que el escaneo del código de barras ha terminado
  if (event.key === "Enter") {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    try {
      const res = await fetch("https://192.168.1.51:4321/api/verify", {
        headers: {
          Authorization: "Bearer " + token + " evento " + uidEvento,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      const { evento, video } = data.decodificacion;
      const isOk = data.status == 200 || data.status == 205;

      if (isOk) {
        modalLector.classList.remove("modal");
      }
      if (data.status == 404 || data.status == 500) {
        qrEquivocado.style.visibility = "visible";
        const mensajeError = document.getElementById("mensajeError");
        mensajeError.textContent = data.message;
      }
    } catch (error) {
      console.error(error);
    }

    // Limpia el valor de 'code' para el próximo escaneo
    code = "";
  }
});
