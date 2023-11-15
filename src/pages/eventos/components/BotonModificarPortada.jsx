import { useState } from "react";
import { showToast } from "../../toast";

export default function BotonModificarPortada({ uid }) {
  const [selectFile, setSelectFile] = useState(false);
const [fileExtension, setFileExtension] = useState(false)

  const handleChange=(e)=>{
    const file=e.target.files[0]
    setFileExtension(file.name.split('.').pop())
    setSelectFile(file)
    console.log(file)
  }
  const handleEdit = async (e) => {
    try {
        e.preventDefault()
        const formData = new FormData();
        formData.append('uid', uid);
        formData.append('file', selectFile);
        formData.append('extension',fileExtension) // const res =await fetch(`api/portadaEdit/${uid}`)
        const response = await fetch('/api/portadaEdit', {
            method: 'POST',
            body: formData,
          });
          showToast('👌 Imagen Cargada',3000)
          const data = await response.json();
          console.log(data)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='absolute right-3 top-3 rounded-full p-2 bg-green-300/80 before:content-["editar"] before:opacity-0 hover:before:opacity-100 before:absolute before:top-2 before:right-11 before:bg-green-300 before:px-2 before:rounded-full before:duration-300 before:text-gray-800'>
      {!selectFile?<label htmFor="editarPortada" onChange={handleChange}>
        🖋️
        <input
          type="file"
          name="editarPortada"
          id="editarPortada"
          className="hidden"
        />
      </label>
    :
    <button className="px-1.5 text-black" onClick={handleEdit}>&#10003;</button>  
    }
    </div>
  );
}
