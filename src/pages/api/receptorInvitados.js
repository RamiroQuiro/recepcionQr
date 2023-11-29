import http from 'http'
import {obtenerInformacionDeLaBaseDeDatos} from './obtenerInformacionDeLaBaseDeDatos.js'
http.createServer((req, res) => {
  if (req.url.startsWith('/event-stream')) {
    // Configurar encabezados para SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': 'http://localhost:4321', // Configurar encabezados para CORS
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
    });

    // Obtener el uidEvento del cliente desde la URL
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const uidEvento = urlParams.get('uidEvento');
console.log(uidEvento)
    // Simular la lectura de la base de datos y enviar evento con el uidEvento al cliente
    function simulateDatabaseRead() {
      // Aquí iría la lógica para leer la base de datos y obtener la información del evento
      const eventData = obtenerInformacionDeLaBaseDeDatos(uidEvento); // Reemplaza esto con tu lógica real

      // Enviar la información al cliente a través del servidor SSE
      res.write(`data: ${JSON.stringify(eventData)}\n\n`);
    }

    // Simular la lectura de la base de datos cada segundo
    const intervalId = setInterval(simulateDatabaseRead, 10000);

    // Detener el intervalo cuando el cliente cierra la conexión
    req.on('close', () => {
      clearInterval(intervalId);
    });
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(8000, () => {
  console.log('El servidor SSE está corriendo en http://localhost:8000');
});