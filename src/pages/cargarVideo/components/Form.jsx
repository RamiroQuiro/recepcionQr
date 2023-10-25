import { useEffect, useState } from "react";

export default function Form() {
  const [file, setFile] = useState(null);
  const [formulario, setFormulario] = useState({});

  const handleFileUp = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };
  
  const handleChange = (e) => {
    setFormulario((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData= new FormData();
    formData.append('titleVideo', formulario.titleVideo);
    formData.append('descipcionVideo', formulario.descipcionVideo);
    formData.append('file', file);
   
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="">
      <div>
        <label htmlFor="rutaVideo">Selecciona un video</label>
        <input
          type="file"
          name="rutaVideo"
          id="rutaVideo"
          onChange={handleFileUp}
        />
      </div>
      <div>
        <label htmlFor="titleVideo">Titulo del video</label>
        <input
          type="text"
          name="titleVideo"
          id="titleVideo"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="descripcionVideo">Descripcion del video</label>
        <input
          type="text"
          name="descripcionVideo"
          id="descripcionVideo"
          onChange={handleChange}
        />
      </div>

      <button onClick={handleClick}>enviar</button>
    </form>
  );
}
