export default function BotonImprimir({credencial,eventoName}) {

  const imprimirTicket = () => {
    const ventana = window.open('', '_blank');
    ventana.document.write(`
      <html>
        <head>
          <title>${eventoName}</title>
          <style>
          body{
            width: 100vw;
          }
            .ticket {
              width: 90vw;
              border: 1px solid #cecece;
              border-radius: 16px;
              padding: 16px;
              display: flex;
              align-items: center;
              justify-content: space-evenly;
            }
            h1, h2 {
              margin: 0;
            }

            .titleEvento{
              text-transform: capitalize;
              font-size:17px
            }
            .nameCredencial{
              font-size:17px;
            }
          </style>
        </head>
        <body>
          <div class="ticket">
            <h1 class="titleEvento">${eventoName}</h1>
            <h2 class="nameCredencial">${credencial.nombreApellido}</h2>
          </div>
        </body>
      </html>
    `);
    ventana.document.close();
    ventana.print();
    ventana.onafterprint = () => {
      ventana.close();
    }
  }
    
  return (
    <button onClick={imprimirTicket} className="flex flex-col rounded-md w-10 h-10 bg-paleta1-primary stroke-gray-500  justify-center items-center mr-4">
      🖨️
    </button>
  )
}