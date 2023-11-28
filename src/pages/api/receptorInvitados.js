
export const GET = async ({ params, request, }) => {
    // Configurar los encabezados para SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
  
    // Enviar un evento cada segundo
    setInterval(() => {
      res.write(`data: ${new Date().toISOString()}\n\n`);
    }, 1000);
  }
  