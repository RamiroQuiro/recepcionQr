
const selectorEventos = document.getElementById('selectorEventos');
const getEventos = async () => {
  try {
    const response = await fetch('/api/eventos');
    const data =await  response.json();
    const eventos=await data.eventos
    console.log(eventos)
    eventos.forEach(evento => {
      const option = document.createElement('option');
      option.value = evento.id;
      option.text = evento.name;
      option.path=evento.path
      selectorEventos.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
  console.log(selectorEventos.value)
};

getEventos();
