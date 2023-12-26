import React, { useState } from 'react'
import { showToast } from '../../toast';
import { mandarToast } from '../../eventos/components/toastShow';

export default function FormularioEventos() {
  const [form, setForm] = useState({ nombre: '', foto: '' });
  const [preview, setPreview] = useState(null);
  const [fileExtension, setFileExtension] = useState(null)

  const handleInputChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const handleImageChange = (event) => {
    setForm({ ...form, foto: event.target.files[0] });
    setPreview(URL.createObjectURL(event.target.files[0]));
    setFileExtension(event.target.files[0].name.split('.').pop())
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nombre', form.nombre);
    formData.append('foto', form.foto);
    formData.append('extencion', fileExtension);
  
    try {
      const response = await fetch('/api/eventos', {
        method: 'POST',
        body: formData,
      });
  
      console.log(response);
      if (response.status === 200) {
        mandarToast('👌 Evento Cargado', { time: 3000 });
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    setPreview(null);
    setForm({ nombre: '', foto: '' });
  }
  

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center text-gray-700">
      <label htmlFor="nombre" className="my-5 border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm">
        <p>Nombre del Evento</p>
        <input type="text" id="nombre" name="nombre" value={form.nombre} required className="rounded-lg ring-0 border p-2" onChange={handleInputChange} />
      </label>

     

      {preview ?(
        <div className="my-5 cursor-pointer text-center border flex items-center justify-between bg-white rounded-lg p-5 w-full h-[350px] gap-2 text-sm">
          <img src={preview} alt="Preview" className="mx-auto object-cover h-full w-auto" />
        </div>
      )
    :(
      <label htmlFor="foto" className="my-5 h-[350px] cursor-pointer text-center border flex items-center justify-between bg-white rounded-lg p-5 w-full gap-2 text-sm">
      <p className="mx-auto animate-pulse text-xs font-medium">Click aqui para cargar tu foto 📂</p>
      <input type="file" id="foto" name="foto" required className="hidden" onChange={handleImageChange} accept="image/*,video/*" />
    </label>
    )
    }

      <button className="disabled:bg-gray-200 cursor-pointer border flex items-center justify-center hover:bg-blue-400 duration-200 hover:ring-2 bg-blue-500 text-white font-medium rounded-lg p-2 text-center w-2/3 gap-2 text-sm">Guardar</button>
    </form>
  )
}